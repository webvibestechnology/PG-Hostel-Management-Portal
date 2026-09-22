package com.pgmanagement.pg_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmanagement.pg_management.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    List<Payment> findByTenant_Id(Integer tenantId);

    List<Payment> findByStatus(String status);
}