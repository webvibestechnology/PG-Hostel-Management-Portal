package com.pgmanagement.pg_management.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VisitorRequest {

    @NotNull(message = "Tenant ID is required")
    private Integer tenantId;

    @NotBlank(message = "Visitor name is required")
    private String visitorname;

    private String visitorPhone;
    private String purpose;
    private LocalDate visitDate;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;

    public VisitorRequest() {
    }

    public VisitorRequest(Integer tenantId, String visitorname, String visitorPhone,
            String purpose, LocalDate visitDate, LocalTime checkInTime,
            LocalTime checkOutTime) {

        this.tenantId = tenantId;
        this.visitorname = visitorname;
        this.visitorPhone = visitorPhone;
        this.purpose = purpose;
        this.visitDate = visitDate;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
    }

    public Integer getTenantId() {
        return tenantId;
    }

    public void setTenantId(Integer tenantId) {
        this.tenantId = tenantId;
    }

    public String getVisitorname() {
        return visitorname;
    }

    public void setVisitorname(String visitorname) {
        this.visitorname = visitorname;
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

    public LocalTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }
}