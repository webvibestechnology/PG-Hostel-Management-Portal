package com.pgmanagement.pg_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pgmanagement.pg_management.dto.NoticeRequest;
import com.pgmanagement.pg_management.entity.Admin;
import com.pgmanagement.pg_management.entity.Notice;
import com.pgmanagement.pg_management.repository.AdminRepository;
import com.pgmanagement.pg_management.repository.NoticeRepository;
import com.pgmanagement.pg_management.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final AdminRepository adminRepository;

    public NoticeServiceImpl(
            NoticeRepository noticeRepository,
            AdminRepository adminRepository) {

        this.noticeRepository = noticeRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public Notice addNotice(NoticeRequest request) {

        Admin admin = adminRepository.findById(request.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        Notice notice = new Notice();

        notice.setTitle(request.getTitle());
        notice.setContent(request.getContent());
        notice.setCreatedBy(admin);
        notice.setTargetAudience(request.getTargetAudience());


        return noticeRepository.save(notice);
    }

    @Override
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    @Override
    public Notice getNoticeById(Integer id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice not found"));
    }

    @Override
    public void deleteNotice(Integer id) {

        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice not found"));

        noticeRepository.delete(notice);
    }
}