package com.pgmanagement.pg_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class NoticeRequest {

    @NotBlank(message = "Notice title is required")
    private String title;

    private String content;

    @NotNull(message = "Admin ID (Created By) is required")
    private Integer createdBy;

    private String targetAudience;

    public NoticeRequest() {
    }

    public NoticeRequest(
            String title,
            String content,
            Integer createdBy,
            String targetAudience) {

        this.title = title;
        this.content = content;
        this.createdBy = createdBy;
        this.targetAudience = targetAudience;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }
}