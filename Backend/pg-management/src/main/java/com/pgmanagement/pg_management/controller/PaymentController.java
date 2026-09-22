package com.pgmanagement.pg_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgmanagement.pg_management.dto.PaymentRequest;
import com.pgmanagement.pg_management.entity.Payment;
import com.pgmanagement.pg_management.service.PaymentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<Payment> addPayment(
            @Valid @RequestBody PaymentRequest request) {
        return ResponseEntity.ok(
                paymentService.addPayment(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(
                paymentService.getAllPayments()
        );
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Payment>> getPaymentsByTenant(
            @PathVariable Integer tenantId) {
        return ResponseEntity.ok(
                paymentService.getPaymentsByTenant(tenantId)
        );
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Payment>> getPendingPayments() {
        return ResponseEntity.ok(
                paymentService.getPendingPayments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(
            @PathVariable Integer id) {
        return ResponseEntity.ok(
                paymentService.getPaymentById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePaymentStatus(
            @PathVariable Integer id,
            @RequestParam String status) {
        return ResponseEntity.ok(
                paymentService.updatePaymentStatus(id, status)
        );
    }
}