package com.pgmanagement.pg_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgmanagement.pg_management.dto.ComplaintRequest;
import com.pgmanagement.pg_management.entity.Complaint;
import com.pgmanagement.pg_management.service.ComplaintService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    public ResponseEntity<Complaint> addComplaint(
            @Valid @RequestBody ComplaintRequest request) {

        return ResponseEntity.ok(
                complaintService.addComplaint(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {

        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }

    @GetMapping("/open")
    public ResponseEntity<List<Complaint>> getOpenComplaints() {

        return ResponseEntity.ok(
                complaintService.getOpenComplaints()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                complaintService.getComplaintById(id)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateComplaintStatus(
            @PathVariable Integer id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                complaintService.updateComplaintStatus(id, status)
        );
    }
}