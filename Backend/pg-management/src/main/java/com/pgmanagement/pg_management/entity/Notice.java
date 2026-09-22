package com.pgmanagement.pg_management.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notice")
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT") // मोठी नोटीस लिहिण्यासाठी TEXT टाईप वापरला
    private String content;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private Admin createdBy; // नोटीस कोणी काढली त्या ॲडमिनचा रेफरन्स

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    // joined by me (नोटीस कोणासाठी आहे - सर्वांसाठी की ठराविक मजल्यासाठी)
    @Column(name = "target_audience")
    private String targetAudience;

    
    public Notice() {
    }

    public Notice(String title, String content, Admin createdBy, String targetAudience) {
        this.title = title;
        this.content = content;
        this.createdBy = createdBy;
        this.targetAudience = targetAudience;
    }

    //show automatic date when pass notice
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Admin getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Admin createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }
}