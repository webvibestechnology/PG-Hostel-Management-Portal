package com.pgmanagement.pg_management.service;

import java.util.List;

import com.pgmanagement.pg_management.dto.VisitorRequest;
import com.pgmanagement.pg_management.entity.Visitor;

public interface VisitorService {

    Visitor addVisitor(VisitorRequest request);

    List<Visitor> getAllVisitors();

    Visitor getVisitorById(Integer id);

    List<Visitor> getVisitorsByTenant(Integer tenantId);

    Visitor checkoutVisitor(Integer id);
}