package com.pgmanagement.pg_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pgmanagement.pg_management.dto.TenantRequest;
import com.pgmanagement.pg_management.entity.Tenant;
import com.pgmanagement.pg_management.repository.TenantRepository;
import com.pgmanagement.pg_management.service.TenantService;

@Service
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;

    public TenantServiceImpl(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @Override
    public Tenant addTenant(TenantRequest request) {

        Tenant tenant = new Tenant();

        tenant.setName(request.getName());
        tenant.setEmail(request.getEmail());
        tenant.setPhone(request.getPhone());
        tenant.setAddress(request.getAddress());
        tenant.setAadhaarNumber(request.getAadhaarNumber());
        tenant.setEmergencyContact(request.getEmergencyContact());

        if (request.getStatus() == null || request.getStatus().isBlank()) {
            tenant.setStatus("ACTIVE");
        } else {
            tenant.setStatus(request.getStatus().toUpperCase());
        }

        return tenantRepository.save(tenant);
    }

    @Override
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    @Override
    public Tenant getTenantById(Integer id) {
        return tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
    }

    @Override
    public List<Tenant> getActiveTenants() {
        return tenantRepository.findByStatus("ACTIVE");
    }

    @Override
    public Tenant updateTenant(Integer id, TenantRequest request) {

        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        tenant.setName(request.getName());
        tenant.setEmail(request.getEmail());
        tenant.setPhone(request.getPhone());
        tenant.setAddress(request.getAddress());
        tenant.setAadhaarNumber(request.getAadhaarNumber());
        tenant.setEmergencyContact(request.getEmergencyContact());

        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            tenant.setStatus(request.getStatus().toUpperCase());
        }

        return tenantRepository.save(tenant);
    }

    @Override
    public void deleteTenant(Integer id) {

        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        // Soft delete
        tenant.setStatus("INACTIVE");

        tenantRepository.save(tenant);
    }
}