package com.pgmanagement.pg_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pgmanagement.pg_management.entity.Tenant;
@Repository
public interface TenantRepository extends JpaRepository<Tenant,Integer> {
	List<Tenant> findByStatus(String status);

}
