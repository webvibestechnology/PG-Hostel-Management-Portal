package com.pgmanagement.pg_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgmanagement.pg_management.dto.VisitorRequest;
import com.pgmanagement.pg_management.entity.Visitor;
import com.pgmanagement.pg_management.service.VisitorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {

    private final VisitorService visitorService;

    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    @PostMapping
    public ResponseEntity<Visitor> addVisitor(
            @Valid @RequestBody VisitorRequest request) {

        return ResponseEntity.ok(
                visitorService.addVisitor(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Visitor>> getAllVisitors() {

        return ResponseEntity.ok(
                visitorService.getAllVisitors()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visitor> getVisitorById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                visitorService.getVisitorById(id)
        );
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Visitor>> getVisitorsByTenant(
            @PathVariable Integer tenantId) {

        return ResponseEntity.ok(
                visitorService.getVisitorsByTenant(tenantId)
        );
    }

    @PutMapping("/{id}/checkout")
    public ResponseEntity<Visitor> checkoutVisitor(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                visitorService.checkoutVisitor(id)
        );
    }
}