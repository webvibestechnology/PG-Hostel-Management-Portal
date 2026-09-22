package com.pgmanagement.pg_management.service;

import java.util.List;

import com.pgmanagement.pg_management.dto.TenantRequest;
import com.pgmanagement.pg_management.entity.Tenant;

public interface TenantService {

    Tenant addTenant(TenantRequest request);

    List<Tenant> getAllTenants();

    Tenant getTenantById(Integer id);

    List<Tenant> getActiveTenants();

    Tenant updateTenant(Integer id, TenantRequest request);

    void deleteTenant(Integer id);
}