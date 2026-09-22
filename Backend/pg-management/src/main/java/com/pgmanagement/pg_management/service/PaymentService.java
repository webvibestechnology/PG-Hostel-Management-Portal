package com.pgmanagement.pg_management.service;

import java.util.List;

import com.pgmanagement.pg_management.dto.PaymentRequest;
import com.pgmanagement.pg_management.entity.Payment;

public interface PaymentService {

    Payment addPayment(PaymentRequest request);

    List<Payment> getAllPayments();

    Payment getPaymentById(Integer id);

    List<Payment> getPaymentsByTenant(Integer tenantId);

    List<Payment> getPendingPayments();

    Payment updatePaymentStatus(Integer id, String status);
}