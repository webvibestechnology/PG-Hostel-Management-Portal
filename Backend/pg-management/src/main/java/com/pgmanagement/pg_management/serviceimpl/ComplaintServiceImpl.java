package com.pgmanagement.pg_management.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.pgmanagement.pg_management.dto.ComplaintRequest;
import com.pgmanagement.pg_management.entity.Complaint;
import com.pgmanagement.pg_management.entity.Tenant;
import com.pgmanagement.pg_management.repository.ComplaintRepository;
import com.pgmanagement.pg_management.repository.TenantRepository;
import com.pgmanagement.pg_management.service.ComplaintService;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final TenantRepository tenantRepository;

    public ComplaintServiceImpl(
            ComplaintRepository complaintRepository,
            TenantRepository tenantRepository) {

        this.complaintRepository = complaintRepository;
        this.tenantRepository = tenantRepository;
    }

    @Override
    public Complaint addComplaint(ComplaintRequest request) {

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Complaint complaint = new Complaint();

        complaint.setTenant(tenant);
        complaint.setTitle(request.getTitle());
        complaint.setDescription(request.getDescription());

        if (request.getStatus() == null || request.getStatus().isBlank()) {
            complaint.setStatus("OPEN");
        } else {
            complaint.setStatus(request.getStatus().toUpperCase());
        }

        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(Integer id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    @Override
    public List<Complaint> getOpenComplaints() {
        return complaintRepository.findByStatus("OPEN");
    }

    @Override
    public Complaint updateComplaintStatus(Integer id, String status) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        String newStatus = status.toUpperCase();

        if (!newStatus.equals("OPEN")
                && !newStatus.equals("IN_PROGRESS")
                && !newStatus.equals("RESOLVED")) {

            throw new RuntimeException(
                    "Invalid status. Use OPEN, IN_PROGRESS or RESOLVED");
        }

        complaint.setStatus(newStatus);

        if (newStatus.equals("RESOLVED")) {
            complaint.setResolvedAt(LocalDateTime.now());
        } else {
            complaint.setResolvedAt(null);
        }

        return complaintRepository.save(complaint);
    }
}