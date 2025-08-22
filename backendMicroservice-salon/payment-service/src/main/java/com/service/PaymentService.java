package com.service;

import com.domain.PaymentMethod;
import com.model.PaymentOrder;
import com.payload.dto.BookingDTO;
import com.payload.dto.UserDTO;
import com.payload.response.PaymentLinkResponse;
import com.razorpay.PaymentLink;
import com.stripe.exception.StripeException;

public interface PaymentService {
    PaymentLinkResponse createOrder(UserDTO user, BookingDTO booking,
                                    PaymentMethod paymentMethod);
    PaymentOrder getPaymentOrderById(Long id) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(Long paymentId);
    PaymentLink createRazorpayPaymentLink(UserDTO user,Long amount,Long orderId);
    String createStripePaymentLink(UserDTO user,Long amount,Long orderId) throws StripeException;
    Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId,String paymentLinkId);


}
