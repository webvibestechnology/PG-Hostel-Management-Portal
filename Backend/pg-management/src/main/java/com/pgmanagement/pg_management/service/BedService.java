package com.pgmanagement.pg_management.service;

import java.util.List;

import com.pgmanagement.pg_management.dto.BedRequest;
import com.pgmanagement.pg_management.entity.Bed;

public interface BedService {

    Bed addBed(BedRequest request);

    List<Bed> getAllBeds();

    Bed getBedById(Integer id);

    List<Bed> getBedsByRoom(Integer roomId);

    List<Bed> getBedsByStatus(String status);

    List<Bed> getAvailableBeds();

    Bed updateBed(Integer id, BedRequest request);

    void deleteBed(Integer id);
}