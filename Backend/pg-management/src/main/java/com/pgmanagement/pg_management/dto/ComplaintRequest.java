package com.pgmanagement.pg_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ComplaintRequest {
	@NotNull(message="Tenant Id is required")
	private Integer tenantId;
	
	@NotBlank(message="Complaint title is required")
	private String title;
	
	private String description;
	private String status;
	
	public ComplaintRequest() {
		
	}
	public ComplaintRequest(Integer tenantId,String title,String description,String status) {
		this.tenantId=tenantId;
		this.title=title;
		this.description=description;
		this.status=status;
	}
	
	public Integer getTenantId() {
		return tenantId;
	}
	public void setTenantId(Integer tenantId) {
		this.tenantId = tenantId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

}
