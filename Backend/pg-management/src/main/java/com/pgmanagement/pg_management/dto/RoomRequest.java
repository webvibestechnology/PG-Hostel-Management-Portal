package com.pgmanagement.pg_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RoomRequest {
	@NotNull(message="Hostel ID is required")
	private Integer hostelId;
	
	@NotBlank(message="Room Numberr is Required")
	private String roomNumber;
	
	private String roomType;
	private Integer floor;
	private String status;
	
	public RoomRequest () {
		
	}

	public RoomRequest (Integer hostelId, String roomNumber, String roomType, Integer floor,String status) {
		this.hostelId = hostelId;
		this.roomNumber = roomNumber;
		this.roomType = roomType;
		this.floor = floor;
		this.status = status;
	}

	public Integer getHostelId() {
		return hostelId;
	}

	public void setHostelId(Integer hostelId) {
		this.hostelId = hostelId;
	}

	public String getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public Integer getFloor() {
		return floor;
	}

	public void setFloor(Integer floor) {
		this.floor = floor;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	

}