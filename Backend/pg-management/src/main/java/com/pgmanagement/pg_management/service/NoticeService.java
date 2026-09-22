package com.pgmanagement.pg_management.service;

import java.util.List;

import com.pgmanagement.pg_management.dto.NoticeRequest;
import com.pgmanagement.pg_management.entity.Notice;

public interface NoticeService {

    Notice addNotice(NoticeRequest request);

    List<Notice> getAllNotices();

    Notice getNoticeById(Integer id);

    void deleteNotice(Integer id);
}