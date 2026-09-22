package com.pgmanagement.pg_management.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AllocationRequest {

    @NotNull(message = "Tenant ID is Required")
    private Integer tenantId;

    @NotNull(message = "Bed ID is required")
    private Integer bedId;

    @NotNull(message = "Start Date is required")
    private LocalDate startDate;

    private LocalDate endDate;

    @NotNull(message = "Status is required")
    private String status;

    public AllocationRequest() {
    }

    public AllocationRequest(Integer tenantId, Integer bedId,
            LocalDate startDate, LocalDate endDate, String status) {
        this.tenantId = tenantId;
        this.bedId = bedId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }

    public Integer getTenantId() {
        return tenantId;
    }

    public void setTenantId(Integer tenantId) {
        this.tenantId = tenantId;
    }

    public Integer getBedId() {
        return bedId;
    }

    public void setBedId(Integer bedId) {
        this.bedId = bedId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}