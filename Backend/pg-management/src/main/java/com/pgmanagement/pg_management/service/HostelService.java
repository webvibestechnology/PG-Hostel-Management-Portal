package com.pgmanagement.pg_management.service;

import java.util.List;

import com.pgmanagement.pg_management.dto.HostelRequest;
import com.pgmanagement.pg_management.entity.Hostel;

public interface HostelService {

    Hostel addHostel(HostelRequest request);

    List<Hostel> getAllHostels();

    Hostel getHostelById(Integer id);

    Hostel updateHostel(Integer id, HostelRequest request);

    void deleteHostel(Integer id);
}