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

    @Column(name = "amount_paid")
    private BigDecimal amountPaid;

    @Column(name = "payment_mode")
    private String paymentMode; // Eg. UPI, Cash, NetBanking

    private String status; // Eg. Paid, Pending, Failed

    private String remarks;

    // joined by me (ऑनलाईन पेमेंटचा UTR नंबर)
    @Column(name = "transaction_id", unique = true)
    private String transactionId;

    
    public Payment() {
    }
    public Payment(Tenant tenant, BigDecimal amount, BigDecimal amountPaid, String paymentMode, String status, String remarks, String transactionId) {
        this.tenant = tenant;
        this.amount = amount;
        this.amountPaid = amountPaid;
        this.paymentMode = paymentMode;
        this.status = status;
        this.remarks = remarks;
        this.transactionId = transactionId;
    }

    // Automatic save payment date and time
    @PrePersist
    protected void onCreate() {
        this.paymentDate = LocalDateTime.now();
    }

    public Integer getid() {
        return id;
    }

    public void setid(Integer id) {
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