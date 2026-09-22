package com.pgmanagement.pg_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pgmanagement.pg_management.dto.RoomRequest;
import com.pgmanagement.pg_management.entity.Hostel;
import com.pgmanagement.pg_management.entity.Room;
import com.pgmanagement.pg_management.repository.HostelRepository;
import com.pgmanagement.pg_management.repository.RoomRepository;
import com.pgmanagement.pg_management.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final HostelRepository hostelRepository;

    public RoomServiceImpl(
            RoomRepository roomRepository,
            HostelRepository hostelRepository) {

        this.roomRepository = roomRepository;
        this.hostelRepository = hostelRepository;
    }

    @Override
    public Room addRoom(RoomRequest request) {

        Hostel hostel = hostelRepository.findById(request.getHostelId())
                .orElseThrow(() -> new RuntimeException("Hostel not found"));

        Room room = new Room();

        room.setHostel(hostel);
        room.setRoomNumber(request.getRoomNumber());
        room.setRoomType(request.getRoomType());
        room.setFloor(request.getFloor());
        room.setStatus(request.getStatus());

        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(Integer id) {

        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    @Override
    public List<Room> getRoomsByStatus(String status) {
        return roomRepository.findByStatus(status);
    }

    @Override
    public Room updateRoom(Integer id, RoomRequest request) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Hostel hostel = hostelRepository.findById(request.getHostelId())
                .orElseThrow(() -> new RuntimeException("Hostel not found"));

        room.setHostel(hostel);
        room.setRoomNumber(request.getRoomNumber());
        room.setRoomType(request.getRoomType());
        room.setFloor(request.getFloor());
        room.setStatus(request.getStatus());

        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Integer id) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        roomRepository.delete(room);
    }
}