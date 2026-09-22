package com.pgmanagement.pg_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgmanagement.pg_management.dto.RoomRequest;
import com.pgmanagement.pg_management.entity.Room;
import com.pgmanagement.pg_management.service.RoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping
    public ResponseEntity<Room> addRoom(
            @Valid @RequestBody RoomRequest request) {

        return ResponseEntity.ok(
                roomService.addRoom(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {

        return ResponseEntity.ok(
                roomService.getAllRooms()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                roomService.getRoomById(id)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Room>> getRoomsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                roomService.getRoomsByStatus(status)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(
            @PathVariable Integer id,
            @Valid @RequestBody RoomRequest request) {

        return ResponseEntity.ok(
                roomService.updateRoom(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(
            @PathVariable Integer id) {

        roomService.deleteRoom(id);

        return ResponseEntity.noContent().build();
    }
}