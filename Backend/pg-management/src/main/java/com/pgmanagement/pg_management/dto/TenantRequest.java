package com.pgmanagement.pg_management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class TenantRequest {

    @NotBlank(message = "Tenant name is required")
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    private String phone;

    private String address;

    @Pattern(
        regexp = "^[0-9]{12}$",
        message = "Aadhaar number must be exactly 12 digits"
    )
    private String aadhaarNumber;

    private String emergencyContact;

    private String status;

    public TenantRequest() {
    }

    public TenantRequest(String name, String email, String phone,
            String address, String aadhaarNumber,
            String emergencyContact, String status) {

        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.aadhaarNumber = aadhaarNumber;
        this.emergencyContact = emergencyContact;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}