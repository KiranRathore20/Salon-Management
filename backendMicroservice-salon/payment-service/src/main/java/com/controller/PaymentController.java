package com.controller;

import com.domain.PaymentMethod;
import com.model.PaymentOrder;
import com.payload.dto.BookingDTO;
import com.payload.dto.UserDTO;
import com.payload.response.PaymentLinkResponse;
import com.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // 🔗 Create a new payment link (Razorpay or Stripe)
    @PostMapping("/create")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @RequestParam PaymentMethod method,
            @RequestBody BookingDTO bookingDTO) {

        // For now, using static user (can be replaced with logged-in user logic)
        UserDTO user = new UserDTO();
        user.setId(1L);
        user.setFullName("Harry");
        user.setEmail("harry@gmail.com");

        PaymentLinkResponse response = paymentService.createOrder(user, bookingDTO, method);
        return ResponseEntity.ok(response);
    }

    // 🔍 Get payment order by ID
    @GetMapping("/{paymentOrderId}")
    public ResponseEntity<PaymentOrder> getPaymentOrderById(@PathVariable Long paymentOrderId) throws Exception {
        PaymentOrder paymentOrder = paymentService.getPaymentOrderById(paymentOrderId);
        return ResponseEntity.ok(paymentOrder);
    }

    // Manually confirm or proceed with payment
    @PostMapping("/{paymentOrderId}/proceed")
    public ResponseEntity<String> proceedPayment(
            @PathVariable Long paymentOrderId,
            @RequestParam String paymentId,
            @RequestParam String paymentLinkId) throws Exception {

        // Step 1: Fetch the payment order
        PaymentOrder paymentOrder = paymentService.getPaymentOrderById(paymentOrderId);

        // Step 2: Attempt to proceed with payment (validate Razorpay status or mark Stripe as successful)
        boolean result = paymentService.proceedPayment(paymentOrder, paymentId, paymentLinkId);

        if (result) {
            return ResponseEntity.ok("Payment successful");
        } else {
            return ResponseEntity.badRequest().body("Payment failed or already completed");
        }
    }
}
