package com.pgmanagement.pg_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgmanagement.pg_management.dto.AllocationRequest;
import com.pgmanagement.pg_management.entity.Allocation;
import com.pgmanagement.pg_management.service.AllocationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/allocations")
public class AllocationController {

    private final AllocationService allocationService;

    public AllocationController(AllocationService allocationService) {
        this.allocationService = allocationService;
    }

    @PostMapping
    public ResponseEntity<Allocation> addAllocation(
            @Valid @RequestBody AllocationRequest request) {
        return ResponseEntity.ok(
                allocationService.addAllocation(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Allocation>> getAllAllocations() {
        return ResponseEntity.ok(
                allocationService.getAllAllocations()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Allocation> getAllocationById(
            @PathVariable Integer id) {
        return ResponseEntity.ok(
                allocationService.getAllocationById(id)
        );
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Allocation>> getAllocationsByTenant(
            @PathVariable Integer tenantId) {
        return ResponseEntity.ok(
                allocationService.getAllocationsByTenant(tenantId)
        );
    }

    @PutMapping("/{id}/vacate")
    public ResponseEntity<Allocation> vacateAllocation(
            @PathVariable Integer id) {
        return ResponseEntity.ok(
                allocationService.vacateAllocation(id)
        );
    }
}