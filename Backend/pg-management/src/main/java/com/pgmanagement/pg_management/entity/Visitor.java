package com.pgmanagement.pg_management.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitor")
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private Tenant tenant; 
    
    @Column(name = "visitor_name", nullable = false)
    private String visitorName;

    @Column(name = "visitor_phone")
    private String visitorPhone;

    private String purpose; 
    
    @Column(name = "visit_date")
    private LocalDate visitDate;

    @Column(name = "check_in_time")
    private LocalDateTime checkInTime;

   
    @Column(name = "check_out_time")
    private LocalDateTime checkOutTime;

    
    public Visitor() {
    }

  
    public Visitor(Tenant tenant, String visitorName, String visitorPhone, String purpose, LocalDate visitDate, LocalDateTime checkInTime, LocalDateTime checkOutTime) {
        this.tenant = tenant;
        this.visitorName = visitorName;
        this.visitorPhone = visitorPhone;
        this.purpose = purpose;
        this.visitDate = visitDate;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
    }

    //Date of visitor
    @PrePersist
    protected void onCreate() {
        this.visitDate = LocalDate.now();
        this.checkInTime = LocalDateTime.now();
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

    public String getVisitorName() {
        return visitorName;
    }

    public void setVisitorName(String visitorName) {
        this.visitorName = visitorName;
    }

    public String getVisitorPhone() {
        return visitorPhone;
    }

    public void setVisitorPhone(String visitorPhone) {
        this.visitorPhone = visitorPhone;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public LocalDateTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalDateTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalDateTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }
}