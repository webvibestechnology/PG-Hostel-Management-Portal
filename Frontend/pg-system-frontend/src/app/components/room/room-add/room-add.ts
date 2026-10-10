import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RoomService } from '../../../services/room';
import { HostelService } from '../../../services/hostel';

import { Room } from '../../../models/room.model';
import { Hostel } from '../../../models/hostel.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-room-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './room-add.html',
  styleUrl: './room-add.css'
})
export class RoomAdd implements OnInit {

  room: Room = {
    hostelId: 0,
    roomNumber: '',
    roomType: '',
    floor: 1,
    status: 'AVAILABLE',
    capacity: 1
  };

  hostels: Hostel[] = [];

  errorMessage = '';

  constructor(
    private roomService: RoomService,
    private hostelService: HostelService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadHostels();
  }

  loadHostels(): void {

    this.hostelService.getAllHostels().subscribe({

      next: (data: Hostel[]) => {

        this.hostels = data ?? [];

        console.log(
          'HOSTELS FOR ROOM:',
          this.hostels
        );
      },

      error: (error: any) => {

        console.error(
          'Error loading hostels:',
          error
        );

        this.errorMessage =
          'Unable to load hostels.';

        this.toastService.showError(
          'Unable to load hostels.'
        );
      }
    });
  }

  getSelectedHostelFloors(): number {

    const hostel = this.hostels.find(
      h => h.id === this.room.hostelId
    );

    return hostel
      ? hostel.totalFloors
      : 1;
  }

  addRoom(): void {

    this.errorMessage = '';

    // Hostel validation
    if (
      !this.room.hostelId ||
      this.room.hostelId === 0
    ) {

      this.errorMessage =
        'Please select a hostel.';

      this.toastService.showError(
        'Please select a hostel.'
      );

      return;
    }

    // Room number validation
    if (!this.room.roomNumber.trim()) {

      this.errorMessage =
        'Please enter room number.';

      this.toastService.showError(
        'Please enter room number.'
      );

      return;
    }

    // Room type validation
    if (!this.room.roomType) {

      this.errorMessage =
        'Please select room type.';

      this.toastService.showError(
        'Please select room type.'
      );

      return;
    }

    const selectedHostel = this.hostels.find(
      hostel => hostel.id === this.room.hostelId
    );

    if (!selectedHostel) {

      this.errorMessage =
        'Please select a hostel.';

      this.toastService.showError(
        'Please select a hostel.'
      );

      return;
    }

    // Floor validation
    if (this.room.floor < 1) {

      this.errorMessage =
        'Floor must be at least 1.';

      this.toastService.showError(
        'Floor must be at least 1.'
      );

      return;
    }

    // Hostel floor limit validation
    if (
      this.room.floor >
      selectedHostel.totalFloors
    ) {

      this.errorMessage =
        `Floor cannot be greater than ${selectedHostel.totalFloors} for ${selectedHostel.name}.`;

      this.toastService.showError(
        `Floor cannot be greater than ${selectedHostel.totalFloors} for ${selectedHostel.name}.`
      );

      return;
    }

    // Status validation
    if (!this.room.status) {

      this.errorMessage =
        'Please select room status.';

      this.toastService.showError(
        'Please select room status.'
      );

      return;
    }

    // Capacity validation
    if (this.room.capacity < 1) {

      this.errorMessage =
        'Capacity must be at least 1.';

      this.toastService.showError(
        'Capacity must be at least 1.'
      );

      return;
    }

    // Add room API
    this.roomService.addRoom(this.room).subscribe({

      next: () => {

        console.log(
          'Room added successfully'
        );

        this.toastService.showSuccess(
          'Room added successfully.'
        );

        this.router.navigate([
          '/dashboard/rooms'
        ]);
      },

      error: (error: any) => {

        console.error(
          'Error adding room:',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          'Failed to add room. Please try again.';

        this.toastService.showError(
          error?.error?.message ||
          'Failed to add room. Please try again.'
        );
      }
    });
  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/rooms'
    ]);
  }
}