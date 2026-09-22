package com.pgmanagement.pg_management.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hostel")
public class Hostel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String address;
    
    private String phone;

    @Column(name = "total_rooms")
    private Integer totalRooms;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    // joined by me (How the floor of hostel)
    @Column(name = "total_floors")
    private Integer totalFloors;

    
    public Hostel() {
    }


    public Hostel(String name, String address, String phone, Integer totalRooms, Integer totalFloors) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.totalRooms = totalRooms;
        this.totalFloors = totalFloors;
    }

   
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getTotalRooms() {
        return totalRooms;
    }

    public void setTotalRooms(Integer totalRooms) {
        this.totalRooms = totalRooms;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getTotalFloors() {
        return totalFloors;
    }

    public void setTotalFloors(Integer totalFloors) {
        this.totalFloors = totalFloors;
    }
}