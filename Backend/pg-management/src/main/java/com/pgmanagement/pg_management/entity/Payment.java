package com.pgmanagement.pg_management.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "payment_month")
    private String paymentMonth;

    @Column(name = "amount_paid")
    private BigDecimal amountPaid;

    @Column(name = "payment_mode")
    private String paymentMode;

    private String status;

    private String remarks;

    @Column(name = "transaction_id", unique = true)
    private String transactionId;

    public Payment() {
    }

    public Payment(
            Tenant tenant,
            BigDecimal amount,
            LocalDateTime paymentDate,
            String paymentMonth,
            BigDecimal amountPaid,
            String paymentMode,
            String status,
            String remarks,
            String transactionId) {

        this.tenant = tenant;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentMonth = paymentMonth;
        this.amountPaid = amountPaid;
        this.paymentMode = paymentMode;
        this.status = status;
        this.remarks = remarks;
        this.transactionId = transactionId;
    }

    @PrePersist
    protected void onCreate() {

        if (this.paymentDate == null) {
            this.paymentDate = LocalDateTime.now();
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
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