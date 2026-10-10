import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RoomService } from '../../../services/room';
import { HostelService } from '../../../services/hostel';

import { Room } from '../../../models/room.model';
import { Hostel } from '../../../models/hostel.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-room-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './room-edit.html',
  styleUrl: './room-edit.css'
})
export class RoomEdit implements OnInit {

  room: Room = {
    hostelId: 0,
    roomNumber: '',
    roomType: '',
    floor: 1,
    status: 'AVAILABLE',
    capacity: 1
  };

  hostels: Hostel[] = [];

  roomId!: number;

  errorMessage = '';

  constructor(
    private roomService: RoomService,
    private hostelService: HostelService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Room ID not found.';

      this.toastService.showError(
        'Room ID not found.'
      );

      this.cdr.detectChanges();
      return;
    }

    this.roomId = Number(id);

    this.loadHostels();
  }

  loadHostels(): void {

    this.hostelService.getAllHostels().subscribe({

      next: (data: Hostel[]) => {

        this.hostels = data ?? [];

        this.cdr.detectChanges();

        this.loadRoom();
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

        this.cdr.detectChanges();
      }
    });
  }

  loadRoom(): void {

    this.roomService.getRoomById(this.roomId).subscribe({

      next: (data: Room) => {

        console.log(
          'ROOM EDIT RESPONSE:',
          data
        );

        this.room = {
          id: data.id,
          hostelId:
            data.hostelId ??
            data.hostel?.id ??
            0,
          hostel: data.hostel,
          roomNumber: data.roomNumber ?? '',
          roomType: data.roomType ?? '',
          floor: data.floor ?? 1,
          status: data.status ?? 'AVAILABLE',
          capacity: data.capacity ?? 1
        };

        // Important:
        // update form immediately
        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error loading room:',
          error
        );

        // BACKEND 404 - ROOM NOT FOUND
        if (error?.status === 404) {

          this.errorMessage =
            'Room not found.';

          this.toastService.showError(
            'Room not found. Redirecting to room list.'
          );

          this.cdr.detectChanges();

          this.router.navigate([
            '/dashboard/rooms'
          ]);

          return;
        }

        // OTHER SERVER ERRORS
        this.errorMessage =
          error?.error?.message ||
          'Unable to load room details.';

        this.toastService.showError(
          error?.error?.message ||
          'Unable to load room details.'
        );

        this.cdr.detectChanges();
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

  updateRoom(): void {

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

    // Floor validation
    if (this.room.floor < 1) {

      this.errorMessage =
        'Floor must be at least 1.';

      this.toastService.showError(
        'Floor must be at least 1.'
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

    // Hostel floor limit
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

    const roomData: Room = {
      hostelId: this.room.hostelId,
      roomNumber: this.room.roomNumber,
      roomType: this.room.roomType,
      floor: this.room.floor,
      status: this.room.status,
      capacity: this.room.capacity
    };

    this.roomService.updateRoom(
      this.roomId,
      roomData
    ).subscribe({

      next: () => {

        console.log(
          'Room updated successfully'
        );

        this.toastService.showSuccess(
          'Room updated successfully.'
        );

        this.router.navigate([
          '/dashboard/rooms'
        ]);
      },

      error: (error: any) => {

        console.error(
          'Error updating room:',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          'Failed to update room. Please try again.';

        this.toastService.showError(
          error?.error?.message ||
          'Failed to update room. Please try again.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  cancel(): void {
    this.router.navigate([
      '/dashboard/rooms'
    ]);
  }
}