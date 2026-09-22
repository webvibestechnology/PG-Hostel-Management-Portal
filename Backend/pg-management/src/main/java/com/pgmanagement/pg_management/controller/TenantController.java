package com.pgmanagement.pg_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgmanagement.pg_management.dto.TenantRequest;
import com.pgmanagement.pg_management.entity.Tenant;
import com.pgmanagement.pg_management.service.TenantService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    private final TenantService tenantService;

    public TenantController(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @PostMapping
    public ResponseEntity<Tenant> addTenant(
            @Valid @RequestBody TenantRequest request) {
        return ResponseEntity.ok(tenantService.addTenant(request));
    }

    @GetMapping
    public ResponseEntity<List<Tenant>> getAllTenants() {
        return ResponseEntity.ok(tenantService.getAllTenants());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Tenant>> getActiveTenants() {
        return ResponseEntity.ok(tenantService.getActiveTenants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tenant> getTenantById(
            @PathVariable Integer id) {
        return ResponseEntity.ok(tenantService.getTenantById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tenant> updateTenant(
            @PathVariable Integer id,
            @Valid @RequestBody TenantRequest request) {
        return ResponseEntity.ok(
                tenantService.updateTenant(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenant(
            @PathVariable Integer id) {
        tenantService.deleteTenant(id);
        return ResponseEntity.noContent().build();
    }
}