package com.pgmanagement.pg_management.serviceimpl;

import java.math.BigDecimal;
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
                .orElseThrow(() ->
                        new RuntimeException("Tenant not found"));

        Payment payment = new Payment();

        payment.setTenant(tenant);

        payment.setAmount(request.getAmount());

        payment.setPaymentMonth(
                request.getPaymentMonth()
        );

        /*
         * Payment date:
         * If user provides a date, use it.
         * Otherwise @PrePersist will use current date/time.
         */
        if (request.getPaymentDate() != null) {

            payment.setPaymentDate(
                    request.getPaymentDate().atStartOfDay()
            );
        }

        /*
         * Default status = Paid
         * if no status is supplied.
         */
        String status = request.getStatus();

        if (status == null || status.isBlank()) {
            status = "Paid";
        } else {
            status = normalizeStatus(status);
        }

        payment.setStatus(status);

        /*
         * Amount Paid:
         * For Paid payment, if amountPaid is not provided,
         * use the full amount.
         */
        BigDecimal amountPaid = request.getAmountPaid();

        if (amountPaid == null) {

            if ("Paid".equalsIgnoreCase(status)) {
                amountPaid = request.getAmount();
            } else {
                amountPaid = BigDecimal.ZERO;
            }
        }

        payment.setAmountPaid(amountPaid);

        payment.setPaymentMode(
                request.getPaymentMode()
        );

        payment.setRemarks(
                request.getRemarks()
        );

        payment.setTransactionId(
                request.getTransactionId()
        );

        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Integer id) {

        return paymentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));
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
    public Payment updatePaymentStatus(
            Integer id,
            String status) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));

        payment.setStatus(
                normalizeStatus(status)
        );

        return paymentRepository.save(payment);
    }

    private String normalizeStatus(String status) {

        if ("PAID".equalsIgnoreCase(status)) {
            return "Paid";
        }

        if ("PENDING".equalsIgnoreCase(status)) {
            return "Pending";
        }

        if ("FAILED".equalsIgnoreCase(status)) {
            return "Failed";
        }

        return status;
    }
}