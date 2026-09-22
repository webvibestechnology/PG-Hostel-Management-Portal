package com.pgmanagement.pg_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pgmanagement.pg_management.entity.Allocation;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation, Integer> {

    List<Allocation> findByTenant_Id(Integer tenantId);
}