package com.pgmanagement.pg_management.service;

import java.util.List;

import com.pgmanagement.pg_management.dto.RoomRequest;
import com.pgmanagement.pg_management.entity.Room;

public interface RoomService {

    Room addRoom(RoomRequest request);

    List<Room> getAllRooms();

    Room getRoomById(Integer id);

    List<Room> getRoomsByStatus(String status);

    Room updateRoom(Integer id, RoomRequest request);

    void deleteRoom(Integer id);
}