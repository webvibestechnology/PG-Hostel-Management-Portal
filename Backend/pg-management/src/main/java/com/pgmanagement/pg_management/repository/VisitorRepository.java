package com.pgmanagement.pg_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmanagement.pg_management.entity.Visitor;

public interface VisitorRepository extends JpaRepository<Visitor, Integer> {

    List<Visitor> findByTenant_Id(Integer tenantId);
}