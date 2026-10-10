import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BedService } from '../../../services/bed';
import { RoomService } from '../../../services/room';

import { Bed } from '../../../models/bed.model';
import { Room } from '../../../models/room.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-bed-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './bed-edit.html',
  styleUrl: './bed-edit.css'
})
export class BedEdit implements OnInit {

  bed: Bed = {
    roomId: 0,
    bedNumber: '',
    status: 'AVAILABLE',
    price: 0
  };

  rooms: Room[] = [];

  bedId!: number;

  errorMessage = '';

  constructor(
    private bedService: BedService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.errorMessage =
        'Bed ID not found.';

      this.toastService.showError(
        'Bed ID not found.'
      );

      this.cdr.detectChanges();
      return;
    }

    this.bedId = Number(id);

    this.loadRooms();
  }

  loadRooms(): void {

    this.roomService.getAllRooms().subscribe({

      next: (data: Room[]) => {

        this.rooms = data ?? [];

        this.cdr.detectChanges();

        this.loadBed();
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

        this.cdr.detectChanges();
      }
    });
  }

  loadBed(): void {

    this.bedService.getBedById(this.bedId).subscribe({

      next: (data: Bed) => {

        console.log(
          'BED EDIT RESPONSE:',
          data
        );

        this.bed = {
          id: data.id,
          roomId:
            data.roomId ??
            data.room?.id ??
            0,
          room: data.room,
          bedNumber: data.bedNumber ?? '',
          status: data.status ?? 'AVAILABLE',
          price: data.price ?? 0
        };

        // Important:
        // Render existing data immediately
        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error loading bed:',
          error
        );

        // BACKEND 404 - BED NOT FOUND
        if (error?.status === 404) {

          this.errorMessage =
            'Bed not found.';

          this.toastService.showError(
            'Bed not found. Redirecting to bed list.'
          );

          this.cdr.detectChanges();

          this.router.navigate([
            '/dashboard/beds'
          ]);

          return;
        }

        // OTHER SERVER ERRORS
        this.errorMessage =
          error?.error?.message ||
          'Unable to load bed details.';

        this.toastService.showError(
          error?.error?.message ||
          'Unable to load bed details.'
        );

        this.cdr.detectChanges();
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

  updateBed(): void {

    this.errorMessage = '';

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

    const room = this.rooms.find(
      r => r.id === this.bed.roomId
    );

    if (!room) {

      this.errorMessage =
        'Selected room not found.';

      this.toastService.showError(
        'Selected room not found.'
      );

      return;
    }

    // Check duplicate bed number inside selected room
    const roomBeds =
      this.bedService.getBedsByRoom(
        this.bed.roomId
      );

    roomBeds.subscribe({

      next: (beds: Bed[]) => {

        const enteredBedNumber =
          this.bed.bedNumber
            .trim()
            .toLowerCase();

        const duplicateBed =
          (beds ?? []).some(
            existingBed => {

              const existingBedNumber =
                existingBed.bedNumber
                  ?.trim()
                  .toLowerCase();

              return (
                existingBed.id !== this.bedId &&
                existingBedNumber ===
                  enteredBedNumber
              );
            }
          );

        if (duplicateBed) {

          this.errorMessage =
            `Bed ${this.bed.bedNumber.trim()} already exists in Room ${room.roomNumber}.`;

          this.toastService.showError(
            this.errorMessage
          );

          this.cdr.detectChanges();

          return;
        }

        const bedData: Bed = {

          roomId: this.bed.roomId,

          bedNumber:
            this.bed.bedNumber.trim(),

          status:
            this.bed.status,

          price:
            this.bed.price
        };

        this.bedService.updateBed(
          this.bedId,
          bedData
        ).subscribe({

          next: () => {

            console.log(
              'Bed updated successfully'
            );

            this.toastService.showSuccess(
              'Bed updated successfully.'
            );

            this.router.navigate([
              '/dashboard/beds'
            ]);
          },

          error: (error: any) => {

            console.error(
              'Error updating bed:',
              error
            );

            this.errorMessage =
              error?.error?.message ||
              'Failed to update bed. Please try again.';

            this.toastService.showError(
              error?.error?.message ||
              'Failed to update bed. Please try again.'
            );

            this.cdr.detectChanges();
          }
        });
      },

      error: (error: any) => {

        console.error(
          'Error checking duplicate bed:',
          error
        );

        this.errorMessage =
          'Unable to verify bed details. Please try again.';

        this.toastService.showError(
          'Unable to verify bed details. Please try again.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/beds'
    ]);
  }
}