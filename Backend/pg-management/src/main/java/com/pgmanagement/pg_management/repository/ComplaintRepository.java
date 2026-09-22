package com.pgmanagement.pg_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmanagement.pg_management.entity.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint,Integer> {
	List<Complaint>findByTenant_Id(Integer tenantId);
	List<Complaint>findByStatus(String status);

}
