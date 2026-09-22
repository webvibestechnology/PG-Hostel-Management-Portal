package com.pgmanagement.pg_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BedRequest {

    @NotNull(message = "Room ID is required")
    private Integer roomId;

    @NotBlank(message = "Bed Number is required")
    private String bedNumber;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "Price is required")
    private Double price;

    public BedRequest() {
    }

    public BedRequest(Integer roomId, String bedNumber, String status, Double price) {
        this.roomId = roomId;
        this.bedNumber = bedNumber;
        this.status = status;
        this.price = price;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public String getBedNumber() {
        return bedNumber;
    }

    public void setBedNumber(String bedNumber) {
        this.bedNumber = bedNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}