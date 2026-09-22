package com.pgmanagement.pg_management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "hostel_id")
    private Hostel hostel; 

    @Column(name = "room_number", nullable = false)
    private String roomNumber; 

    @Column(name = "room_type")
    private String roomType; // eg. AC, Non-AC

    private Integer floor;

    private String status; // Eg. Available, Full, Maintenance

    // joined by me (Capasity of bed in room)
    private Integer capacity;

    public Room() {
    }

    public Room(Hostel hostel, String roomNumber, String roomType, Integer floor, String status, Integer capacity) {
        this.hostel = hostel;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.floor = floor;
        this.status = status;
        this.capacity = capacity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Hostel getHostel() {
        return hostel;
    }

    public void setHostel(Hostel hostel) {
        this.hostel = hostel;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}