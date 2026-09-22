package com.pgmanagement.pg_management.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgmanagement.pg_management.dto.AdminLoginRequest;
import com.pgmanagement.pg_management.entity.Admin;
import com.pgmanagement.pg_management.service.AdminService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(
            @Valid @RequestBody AdminLoginRequest request) {

        Admin admin = adminService.login(request);

        return ResponseEntity.ok(admin);
    }
}