package com.pgmanagement.pg_management.entity;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "tenant")
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    private String phone;
    
    private String address;

    @Column(name = "aadhaar_number", unique = true)
    private String aadhaarNumber;

    @Column(name = "emergency_contact") 
    private String emergencyContact;

    @Column(name = "join_date", updatable = false)
    private LocalDateTime joinDate;

    // joined by me (भाडेकरू Active आहे की सोडून गेलाय)
    private String status; 

    public Tenant() {
    }

    
    public Tenant(String name, String email, String phone, String address, String aadhaarNumber, String emergencyContact, String status) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.aadhaarNumber = aadhaarNumber;
        this.emergencyContact = emergencyContact;
        this.status = status;
    }

    // जॉइनिंगची तारीख आणि वेळ आपोआप सेट होण्यासाठी
    @PrePersist
    protected void onCreate() {
        this.joinDate = LocalDateTime.now();
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public LocalDateTime getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDateTime joinDate) {
        this.joinDate = joinDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}