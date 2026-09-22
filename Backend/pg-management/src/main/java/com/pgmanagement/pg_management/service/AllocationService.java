package com.pgmanagement.pg_management.service;

import java.util.List;

import com.pgmanagement.pg_management.dto.AllocationRequest;
import com.pgmanagement.pg_management.entity.Allocation;

public interface AllocationService {

    Allocation addAllocation(AllocationRequest request);

    List<Allocation> getAllAllocations();

    Allocation getAllocationById(Integer id);

    List<Allocation> getAllocationsByTenant(Integer tenantId);

    Allocation vacateAllocation(Integer id);
}