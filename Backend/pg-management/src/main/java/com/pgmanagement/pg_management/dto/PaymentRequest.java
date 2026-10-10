package com.pgmanagement.pg_management.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class PaymentRequest {

    @NotNull(message = "Tenant Id is required")
    private Integer tenantId;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private BigDecimal amount;

    private LocalDate paymentDate;

    @NotBlank(message = "Payment month is required")
    private String paymentMonth;

    @PositiveOrZero(message = "Amount paid cannot be negative")
    private BigDecimal amountPaid;

    private String paymentMode;

    private String status;

    private String remarks;

    private String transactionId;

    public PaymentRequest() {
    }

    public PaymentRequest(
            Integer tenantId,
            BigDecimal amount,
            LocalDate paymentDate,
            String paymentMonth,
            BigDecimal amountPaid,
            String paymentMode,
            String status,
            String remarks,
            String transactionId) {

        this.tenantId = tenantId;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentMonth = paymentMonth;
        this.amountPaid = amountPaid;
        this.paymentMode = paymentMode;
        this.status = status;
        this.remarks = remarks;
        this.transactionId = transactionId;
    }

    public Integer getTenantId() {
        return tenantId;
    }

    public void setTenantId(Integer tenantId) {
        this.tenantId = tenantId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentMonth() {
        return paymentMonth;
    }

    public void setPaymentMonth(String paymentMonth) {
        this.paymentMonth = paymentMonth;
    }

    public BigDecimal getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        this.amountPaid = amountPaid;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}