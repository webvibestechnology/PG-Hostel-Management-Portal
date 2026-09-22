package com.pgmanagement.pg_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgmanagement.pg_management.dto.BedRequest;
import com.pgmanagement.pg_management.entity.Bed;
import com.pgmanagement.pg_management.service.BedService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/beds")
public class BedController {

    private final BedService bedService;

    public BedController(BedService bedService) {
        this.bedService = bedService;
    }

    @PostMapping
    public ResponseEntity<Bed> addBed(
            @Valid @RequestBody BedRequest request) {
        return ResponseEntity.ok(bedService.addBed(request));
    }

    @GetMapping
    public ResponseEntity<List<Bed>> getAllBeds() {
        return ResponseEntity.ok(bedService.getAllBeds());
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<Bed>> getBedsByRoom(
            @PathVariable Integer roomId) {
        return ResponseEntity.ok(bedService.getBedsByRoom(roomId));
    }

    @GetMapping("/available")
    public ResponseEntity<List<Bed>> getAvailableBeds() {
        return ResponseEntity.ok(bedService.getAvailableBeds());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bed> getBedById(
            @PathVariable Integer id) {
        return ResponseEntity.ok(bedService.getBedById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bed> updateBed(
            @PathVariable Integer id,
            @Valid @RequestBody BedRequest request) {
        return ResponseEntity.ok(
                bedService.updateBed(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBed(
            @PathVariable Integer id) {
        bedService.deleteBed(id);
        return ResponseEntity.noContent().build();
    }
}