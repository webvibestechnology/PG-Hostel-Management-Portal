package com.pgmanagement.pg_management.service;

import com.pgmanagement.pg_management.dto.AdminLoginRequest;
import com.pgmanagement.pg_management.entity.Admin;

public interface AdminService {

    Admin login(AdminLoginRequest request);

}