package com.pgmanagement.pg_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgmanagement.pg_management.dto.HostelRequest;
import com.pgmanagement.pg_management.entity.Hostel;
import com.pgmanagement.pg_management.service.HostelService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/hostels")
public class HostelController {

    private final HostelService hostelService;

    public HostelController(HostelService hostelService) {
        this.hostelService = hostelService;
    }

    @PostMapping
    public ResponseEntity<Hostel> addHostel(
            @Valid @RequestBody HostelRequest request) {

        return ResponseEntity.ok(
                hostelService.addHostel(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Hostel>> getAllHostels() {

        return ResponseEntity.ok(
                hostelService.getAllHostels()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hostel> getHostelById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                hostelService.getHostelById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hostel> updateHostel(
            @PathVariable Integer id,
            @Valid @RequestBody HostelRequest request) {

        return ResponseEntity.ok(
                hostelService.updateHostel(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHostel(
            @PathVariable Integer id) {

        hostelService.deleteHostel(id);

        return ResponseEntity.noContent().build();
    }
}