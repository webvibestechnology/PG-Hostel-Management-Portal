package com.pgmanagement.pg_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmanagement.pg_management.entity.Bed;

public interface BedRepository extends JpaRepository<Bed, Integer> {

    List<Bed> findByRoom_Id(Integer roomId);

    List<Bed> findByStatus(String status);

    boolean existsByRoom_IdAndBedNumber(Integer roomId, String bedNumber);
}