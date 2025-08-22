package com.service.impl;

import com.domain.PaymentMethod;
import com.domain.PaymentOrderStatus;
import com.model.PaymentOrder;
import com.payload.dto.BookingDTO;
import com.payload.dto.UserDTO;
import com.payload.response.PaymentLinkResponse;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.repository.PaymentOrderRepository;
import com.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;

    // Stripe and Razorpay keys injected from application.properties
    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${razorpay.api.key}")
    private String razorpayApiKey;

    @Value("${razorpay.api.secret}")
    private String razorpaySecret;

    // ✅ Creates a new payment order and returns payment link
    @Override
    public PaymentLinkResponse createOrder(UserDTO user, BookingDTO booking, PaymentMethod paymentMethod) {
        Long amount = (long) booking.getTotalPrice();

        // Create and save payment order
        PaymentOrder order = new PaymentOrder();
        order.setAmount(amount);
        order.setPaymentMethod(paymentMethod);
        order.setBookingId(booking.getId());
        order.setSalonId(booking.getSalonId());
        order.setUserId(user.getId());
        order.setStatus(PaymentOrderStatus.PENDING);
        PaymentOrder savedOrder = paymentOrderRepository.save(order);

        PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();

        if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
            // Create Razorpay payment link
            PaymentLink payment = createRazorpayPaymentLink(user, savedOrder.getAmount(), savedOrder.getId());
            String paymentUrl = payment.get("short_url");
            String paymentUrlId = payment.get("id");

            paymentLinkResponse.setPayment_link_url(paymentUrl);
            paymentLinkResponse.setGetPayment_link_id(paymentUrlId);

            // Save Razorpay payment link ID in DB
            savedOrder.setPaymentLinkId(paymentUrlId);
            paymentOrderRepository.save(savedOrder);

        } else {
            // Create Stripe payment link
            String paymentUrl = createStripePaymentLink(user, savedOrder.getAmount(), savedOrder.getId());
            paymentLinkResponse.setPayment_link_url(paymentUrl);
        }

        return paymentLinkResponse;
    }

    // ✅ Fetch payment order by ID
    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findById(id).orElse(null);
        if (paymentOrder == null) {
            throw new Exception("Payment order not found");
        }
        return paymentOrder;
    }

    // ✅ Fetch payment order by Razorpay paymentLinkId
    @Override
    public PaymentOrder getPaymentOrderByPaymentId(Long paymentId) {
        return paymentOrderRepository.findByPaymentLinkId(String.valueOf(paymentId));
    }

    // ✅ Create Razorpay payment link
    @Override
    public PaymentLink createRazorpayPaymentLink(UserDTO user, Long amount, Long orderId) {
        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayApiKey, razorpaySecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount * 100); // INR paise
            paymentLinkRequest.put("currency", "INR");

            // Customer details
            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            // Notification config
            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("reminder_enable", true);
            paymentLinkRequest.put("callback_url", "http://localhost:3000/payment-success");
            paymentLinkRequest.put("callback_method", "get");

            return razorpay.paymentLink.create(paymentLinkRequest);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // ✅ Create Stripe payment session
    @Override
    public String createStripePaymentLink(UserDTO user, Long amount, Long orderId) {
        try {
            Stripe.apiKey = stripeSecretKey;

            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:3000/payment-success/" + orderId)
                    .setCancelUrl("http://localhost:3000/payment-cancel/")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount(amount * 100)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Salon Appointment Booking")
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();

            Session session = Session.create(params);
            return session.getUrl();

        } catch (StripeException e) {
            e.printStackTrace();
            return null;
        }
    }

    //  Update payment order status after confirmation
    @Override
    public Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) {
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {

            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
                try {
                    RazorpayClient razorpay = new RazorpayClient(razorpayApiKey, razorpaySecret);
                    Payment payment = razorpay.payments.fetch(paymentId);
                    String status = payment.get("status");

                    if (status.equals("captured")) {
                        paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                        paymentOrderRepository.save(paymentOrder);
                        return true;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
                return false;

            } else {
                // Stripe success handled via redirect
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }
        }
        return false;
    }
}
