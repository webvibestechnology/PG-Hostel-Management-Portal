package com.pgmanagement.pg_management.serviceimpl;

import org.springframework.stereotype.Service;

import com.pgmanagement.pg_management.dto.AdminLoginRequest;
import com.pgmanagement.pg_management.entity.Admin;
import com.pgmanagement.pg_management.repository.AdminRepository;
import com.pgmanagement.pg_management.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public Admin login(AdminLoginRequest request) {

        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!admin.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return admin;
    }
}