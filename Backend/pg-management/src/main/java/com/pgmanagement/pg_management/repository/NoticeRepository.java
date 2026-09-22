package com.pgmanagement.pg_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmanagement.pg_management.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice,Integer> {

}
