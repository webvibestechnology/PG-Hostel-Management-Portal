package com.pgmanagement.pg_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgmanagement.pg_management.dto.NoticeRequest;
import com.pgmanagement.pg_management.entity.Notice;
import com.pgmanagement.pg_management.service.NoticeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @PostMapping
    public ResponseEntity<Notice> addNotice(
            @Valid @RequestBody NoticeRequest request) {

        return ResponseEntity.ok(
                noticeService.addNotice(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {

        return ResponseEntity.ok(
                noticeService.getAllNotices()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getNoticeById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                noticeService.getNoticeById(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(
            @PathVariable Integer id) {

        noticeService.deleteNotice(id);

        return ResponseEntity.noContent().build();
    }
}