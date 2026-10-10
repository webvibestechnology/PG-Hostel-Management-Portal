package com.pgmanagement.pg_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pgmanagement.pg_management.dto.BedRequest;
import com.pgmanagement.pg_management.entity.Bed;
import com.pgmanagement.pg_management.entity.Room;
import com.pgmanagement.pg_management.repository.BedRepository;
import com.pgmanagement.pg_management.repository.RoomRepository;
import com.pgmanagement.pg_management.service.BedService;

@Service
public class BedServiceImpl implements BedService {

    private final BedRepository bedRepository;
    private final RoomRepository roomRepository;

    public BedServiceImpl(
            BedRepository bedRepository,
            RoomRepository roomRepository) {

        this.bedRepository = bedRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public Bed addBed(BedRequest request) {

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        boolean bedExists = bedRepository.existsByRoom_IdAndBedNumber(
                request.getRoomId(),
                request.getBedNumber()
        );

        if (bedExists) {
            throw new RuntimeException(
                    "Bed " + request.getBedNumber() +
                    " already exists in Room " + room.getRoomNumber()
            );
        }

        Bed bed = new Bed();

        bed.setRoom(room);
        bed.setBedNumber(request.getBedNumber());
        bed.setStatus(request.getStatus());
        bed.setPrice(request.getPrice());

        return bedRepository.save(bed);
    }

    @Override
    public List<Bed> getAllBeds() {
        return bedRepository.findAll();
    }

    @Override
    public Bed getBedById(Integer id) {

        return bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found"));
    }

    @Override
    public List<Bed> getBedsByRoom(Integer roomId) {
        return bedRepository.findByRoom_Id(roomId);
    }

    @Override
    public List<Bed> getBedsByStatus(String status) {
        return bedRepository.findByStatus(status);
    }
    @Override
    public List<Bed> getAvailableBeds() {
        return bedRepository.findByStatus("AVAILABLE");
    }

    @Override
    public Bed updateBed(Integer id, BedRequest request) {

        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        boolean bedExists = bedRepository.existsByRoom_IdAndBedNumber(
                request.getRoomId(),
                request.getBedNumber()
        );

        if (bedExists && !bed.getId().equals(id)) {
            throw new RuntimeException(
                    "Bed " + request.getBedNumber() +
                    " already exists in Room " + room.getRoomNumber()
            );
        }

        bed.setRoom(room);
        bed.setBedNumber(request.getBedNumber());
        bed.setStatus(request.getStatus());
        bed.setPrice(request.getPrice());

        return bedRepository.save(bed);
    }

    @Override
    public void deleteBed(Integer id) {

        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        bedRepository.delete(bed);
    }
}