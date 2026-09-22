package com.pgmanagement.pg_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class HostelRequest {

    @NotBlank(message = "Hostel name is required")
    private String name;

    private String address;

    @Size(
        min = 10,
        max = 15,
        message = "Phone number must be between 10 and 15 digits"
    )
    private String phone;

    private Integer totalRooms;

    private Integer totalFloors;

    public HostelRequest() {
    }

    public HostelRequest(
            String name,
            String address,
            String phone,
            Integer totalRooms,
            Integer totalFloors) {

        this.name = name;
        this.address = address;
        this.phone = phone;
        this.totalRooms = totalRooms;
        this.totalFloors = totalFloors;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getTotalRooms() {
        return totalRooms;
    }

    public void setTotalRooms(Integer totalRooms) {
        this.totalRooms = totalRooms;
    }

    public Integer getTotalFloors() {
        return totalFloors;
    }

    public void setTotalFloors(Integer totalFloors) {
        this.totalFloors = totalFloors;
    }
}