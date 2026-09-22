package com.pgmanagement.pg_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pgmanagement.pg_management.dto.PaymentRequest;
import com.pgmanagement.pg_management.entity.Payment;
import com.pgmanagement.pg_management.entity.Tenant;
import com.pgmanagement.pg_management.repository.PaymentRepository;
import com.pgmanagement.pg_management.repository.TenantRepository;
import com.pgmanagement.pg_management.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final TenantRepository tenantRepository;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            TenantRepository tenantRepository) {

        this.paymentRepository = paymentRepository;
        this.tenantRepository = tenantRepository;
    }

    @Override
    public Payment addPayment(PaymentRequest request) {

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Payment payment = new Payment();

        payment.setTenant(tenant);
        payment.setAmount(request.getAmount());
        payment.setAmountPaid(request.getAmountPaid());
        payment.setPaymentMode(request.getPaymentMode());
        payment.setStatus(request.getStatus());
        payment.setRemarks(request.getRemarks());
        payment.setTransactionId(request.getTransactionId());

        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Integer id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public List<Payment> getPaymentsByTenant(Integer tenantId) {
        return paymentRepository.findByTenant_Id(tenantId);
    }

    @Override
    public List<Payment> getPendingPayments() {
        return paymentRepository.findByStatus("Pending");
    }

    @Override
    public Payment updatePaymentStatus(Integer id, String status) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus(status);

        return paymentRepository.save(payment);
    }
}