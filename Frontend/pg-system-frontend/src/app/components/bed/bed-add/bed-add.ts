import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BedService } from '../../../services/bed';
import { RoomService } from '../../../services/room';

import { Bed } from '../../../models/bed.model';
import { Room } from '../../../models/room.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-bed-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './bed-add.html',
  styleUrl: './bed-add.css'
})
export class BedAdd implements OnInit {

  bed: Bed = {
    roomId: 0,
    bedNumber: '',
    status: 'AVAILABLE',
    price: 0
  };

  rooms: Room[] = [];
  beds: Bed[] = [];

  errorMessage = '';
  saving = false;

  constructor(
    private bedService: BedService,
    private roomService: RoomService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadRooms();
    this.loadBeds();
  }

  loadRooms(): void {

    this.roomService.getAllRooms().subscribe({

      next: (data: Room[]) => {

        console.log('ROOMS FOR BED:', data);

        this.rooms = data ?? [];
      },

      error: (error: any) => {

        console.error(
          'Error loading rooms:',
          error
        );

        this.errorMessage =
          'Unable to load rooms.';

        this.toastService.showError(
          'Unable to load rooms.'
        );
      }
    });
  }

  loadBeds(): void {

    this.bedService.getAllBeds().subscribe({

      next: (data: Bed[]) => {

        console.log(
          'BEDS FOR DUPLICATE CHECK:',
          data
        );

        this.beds = data ?? [];
      },

      error: (error: any) => {

        console.error(
          'Error loading beds:',
          error
        );

        this.toastService.showError(
          'Unable to load existing beds.'
        );
      }
    });
  }

  getRoomLabel(room: Room): string {

    const roomNumber =
      room.roomNumber || 'Unknown Room';

    const hostelName =
      room.hostel?.name;

    if (hostelName) {
      return `${roomNumber} - ${hostelName}`;
    }

    return roomNumber;
  }

  addBed(): void {

    this.errorMessage = '';

    if (this.saving) {
      return;
    }

    // Room validation
    if (
      !this.bed.roomId ||
      this.bed.roomId === 0
    ) {

      this.errorMessage =
        'Please select a room.';

      this.toastService.showError(
        'Please select a room.'
      );

      return;
    }

    // Bed number validation
    if (!this.bed.bedNumber.trim()) {

      this.errorMessage =
        'Please enter bed number.';

      this.toastService.showError(
        'Please enter bed number.'
      );

      return;
    }

    // Status validation
    if (!this.bed.status) {

      this.errorMessage =
        'Please select bed status.';

      this.toastService.showError(
        'Please select bed status.'
      );

      return;
    }

    // Price validation
    if (this.bed.price <= 0) {

      this.errorMessage =
        'Price must be greater than 0.';

      this.toastService.showError(
        'Price must be greater than 0.'
      );

      return;
    }

    const selectedRoom = this.rooms.find(
      room => room.id === this.bed.roomId
    );

    if (!selectedRoom) {

      this.errorMessage =
        'Selected room not found.';

      this.toastService.showError(
        'Selected room not found.'
      );

      return;
    }

    const enteredBedNumber =
      this.bed.bedNumber
        .trim()
        .toLowerCase();

    /*
     * Frontend duplicate check.
     * No extra API request is needed here.
     */
    const duplicateBed = this.beds.some(
      bed => {

        const existingRoomId =
          bed.roomId ?? bed.room?.id;

        const existingBedNumber =
          bed.bedNumber
            ?.trim()
            .toLowerCase();

        return (
          existingRoomId === this.bed.roomId &&
          existingBedNumber === enteredBedNumber
        );
      }
    );

    if (duplicateBed) {

      const hostelName =
        selectedRoom.hostel?.name ||
        'selected hostel';

      this.errorMessage =
        `Bed ${this.bed.bedNumber.trim()} already exists in Room ${selectedRoom.roomNumber} of ${hostelName}.`;

      this.toastService.showError(
        this.errorMessage
      );

      return;
    }

    /*
     * No duplicate found.
     * Now save directly.
     */
    this.saving = true;

    this.bedService.addBed(this.bed).subscribe({

      next: () => {

        console.log(
          'Bed added successfully'
        );

        this.saving = false;

        this.toastService.showSuccess(
          'Bed added successfully.'
        );

        this.router.navigate([
          '/dashboard/beds'
        ]);
      },

      error: (error: any) => {

        console.error(
          'Error adding bed:',
          error
        );

        this.saving = false;

        this.errorMessage =
          error?.error?.message ||
          `Failed to add Bed ${this.bed.bedNumber}. Please try again.`;

        this.toastService.showError(
          error?.error?.message ||
          `Failed to add Bed ${this.bed.bedNumber}. Please try again.`
        );
      }
    });
  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/beds'
    ]);
  }
}