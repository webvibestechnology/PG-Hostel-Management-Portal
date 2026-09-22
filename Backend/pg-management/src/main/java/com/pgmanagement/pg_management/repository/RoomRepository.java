package com.pgmanagement.pg_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmanagement.pg_management.entity.Room;

public interface RoomRepository extends JpaRepository<Room,Integer> {
	List<Room> findByStatus(String status);

}
