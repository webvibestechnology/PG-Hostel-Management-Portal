package com.pgmanagement.pg_management.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.pgmanagement.pg_management.dto.AllocationRequest;
import com.pgmanagement.pg_management.entity.Allocation;
import com.pgmanagement.pg_management.entity.Bed;
import com.pgmanagement.pg_management.entity.Tenant;
import com.pgmanagement.pg_management.repository.AllocationRepository;
import com.pgmanagement.pg_management.repository.BedRepository;
import com.pgmanagement.pg_management.repository.TenantRepository;
import com.pgmanagement.pg_management.service.AllocationService;

@Service
public class AllocationServiceImpl implements AllocationService {

    private final AllocationRepository allocationRepository;
    private final TenantRepository tenantRepository;
    private final BedRepository bedRepository;

    public AllocationServiceImpl(
            AllocationRepository allocationRepository,
            TenantRepository tenantRepository,
            BedRepository bedRepository) {

        this.allocationRepository = allocationRepository;
        this.tenantRepository = tenantRepository;
        this.bedRepository = bedRepository;
    }

    @Override
    public Allocation addAllocation(AllocationRequest request) {

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() ->
                        new RuntimeException("Tenant not found"));

        Bed bed = bedRepository.findById(request.getBedId())
                .orElseThrow(() ->
                        new RuntimeException("Bed not found"));

        // Tenant must be ACTIVE
        if (!"ACTIVE".equalsIgnoreCase(tenant.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Tenant is not active");
        }

        // Bed must be AVAILABLE
        if (!"AVAILABLE".equalsIgnoreCase(bed.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Bed is not available");
        }

        Allocation allocation = new Allocation();

        allocation.setTenant(tenant);
        allocation.setBed(bed);
        allocation.setStartDate(request.getStartDate());

        // Allocation must start as ACTIVE
        allocation.setStatus("ACTIVE");

        Allocation savedAllocation = allocationRepository.save(allocation);

        // Bed becomes OCCUPIED
        bed.setStatus("OCCUPIED");
        bedRepository.save(bed);

        return savedAllocation;
    }

    @Override
    public List<Allocation> getAllAllocations() {
        return allocationRepository.findAll();
    }

    @Override
    public Allocation getAllocationById(Integer id) {
        return allocationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Allocation not found"));
    }

    @Override
    public List<Allocation> getAllocationsByTenant(Integer tenantId) {
        return allocationRepository.findByTenant_Id(tenantId);
    }

    @Override
    public Allocation vacateAllocation(Integer id) {

        Allocation allocation = allocationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Allocation not found"));

        allocation.setStatus("VACATED");

        // Vacating date = today
        allocation.setEndDate(LocalDate.now());

        // Bed becomes AVAILABLE again
        Bed bed = allocation.getBed();
        bed.setStatus("AVAILABLE");

        bedRepository.save(bed);

        return allocationRepository.save(allocation);
    }
}