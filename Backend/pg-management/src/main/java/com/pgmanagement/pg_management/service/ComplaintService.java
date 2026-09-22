package com.pgmanagement.pg_management.service;

import java.util.List;

import com.pgmanagement.pg_management.dto.ComplaintRequest;
import com.pgmanagement.pg_management.entity.Complaint;

public interface ComplaintService {

    Complaint addComplaint(ComplaintRequest request);

    List<Complaint> getAllComplaints();

    Complaint getComplaintById(Integer id);

    List<Complaint> getOpenComplaints();

    Complaint updateComplaintStatus(Integer id, String status);
}