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

    // =========================
    // ADD COMPLAINT
    // =========================
    @PostMapping
    public ResponseEntity<Complaint> addComplaint(
            @Valid @RequestBody ComplaintRequest request) {

        return ResponseEntity.ok(
                complaintService.addComplaint(request)
        );
    }

    // =========================
    // GET ALL COMPLAINTS
    // =========================
    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {

        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }

    // =========================
    // GET OPEN COMPLAINTS
    // =========================
    @GetMapping("/open")
    public ResponseEntity<List<Complaint>> getOpenComplaints() {

        return ResponseEntity.ok(
                complaintService.getOpenComplaints()
        );
    }

    // =========================
    // GET COMPLAINT BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                complaintService.getComplaintById(id)
        );
    }

    // =========================
    // UPDATE COMPLAINT STATUS
    // =========================
    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateComplaintStatus(
            @PathVariable Integer id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                complaintService.updateComplaintStatus(id, status)
        );
    }
}