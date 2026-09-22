package com.pgmanagement.pg_management.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.pgmanagement.pg_management.dto.VisitorRequest;
import com.pgmanagement.pg_management.entity.Tenant;
import com.pgmanagement.pg_management.entity.Visitor;
import com.pgmanagement.pg_management.repository.TenantRepository;
import com.pgmanagement.pg_management.repository.VisitorRepository;
import com.pgmanagement.pg_management.service.VisitorService;

@Service
public class VisitorServiceImpl implements VisitorService {

    private final VisitorRepository visitorRepository;
    private final TenantRepository tenantRepository;

    public VisitorServiceImpl(
            VisitorRepository visitorRepository,
            TenantRepository tenantRepository) {

        this.visitorRepository = visitorRepository;
        this.tenantRepository = tenantRepository;
    }

    @Override
    public Visitor addVisitor(VisitorRequest request) {

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Visitor visitor = new Visitor();

        visitor.setTenant(tenant);
        visitor.setVisitorName(request.getVisitorname());
        visitor.setVisitorPhone(request.getVisitorPhone());
        visitor.setPurpose(request.getPurpose());

        return visitorRepository.save(visitor);
    }

    @Override
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @Override
    public Visitor getVisitorById(Integer id) {
        return visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found"));
    }

    @Override
    public List<Visitor> getVisitorsByTenant(Integer tenantId) {
        return visitorRepository.findByTenant_Id(tenantId);
    }

    @Override
    public Visitor checkoutVisitor(Integer id) {

        Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found"));

        visitor.setCheckOutTime(LocalDateTime.now());

        return visitorRepository.save(visitor);
    }
}