package com.pgmanagement.pg_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pgmanagement.pg_management.dto.HostelRequest;
import com.pgmanagement.pg_management.entity.Hostel;
import com.pgmanagement.pg_management.repository.HostelRepository;
import com.pgmanagement.pg_management.service.HostelService;

@Service
public class HostelServiceImpl implements HostelService {

    private final HostelRepository hostelRepository;

    public HostelServiceImpl(HostelRepository hostelRepository) {
        this.hostelRepository = hostelRepository;
    }

    @Override
    public Hostel addHostel(HostelRequest request) {

        Hostel hostel = new Hostel();

        hostel.setName(request.getName());
        hostel.setAddress(request.getAddress());
        hostel.setPhone(request.getPhone());
        hostel.setTotalRooms(request.getTotalRooms());
        hostel.setTotalFloors(request.getTotalFloors());

        return hostelRepository.save(hostel);
    }

    @Override
    public List<Hostel> getAllHostels() {
        return hostelRepository.findAll();
    }

    @Override
    public Hostel getHostelById(Integer id) {

        return hostelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hostel not found"));
    }

    @Override
    public Hostel updateHostel(Integer id, HostelRequest request) {

        Hostel hostel = hostelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hostel not found"));

        hostel.setName(request.getName());
        hostel.setAddress(request.getAddress());
        hostel.setPhone(request.getPhone());

        return hostelRepository.save(hostel);
    }

    @Override
    public void deleteHostel(Integer id) {

        Hostel hostel = hostelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hostel not found"));

        hostelRepository.delete(hostel);
    }
}