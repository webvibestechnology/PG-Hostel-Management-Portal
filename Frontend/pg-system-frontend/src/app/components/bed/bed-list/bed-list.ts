import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { BedService } from '../../../services/bed';
import { RoomService } from '../../../services/room';

import { Bed } from '../../../models/bed.model';
import { Room } from '../../../models/room.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-bed-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './bed-list.html',
  styleUrl: './bed-list.css'
})
export class BedList implements OnInit {
  successMessage = '';

  beds: Bed[] = [];
  rooms: Room[] = [];

  availableBeds = 0;

  deletingBedId: number | null = null;

  constructor(
    private bedService: BedService,
    private roomService: RoomService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.roomService.getAllRooms().subscribe({

      next: (rooms: Room[]) => {

        this.rooms = rooms ?? [];

        this.cdr.detectChanges();

        this.loadBeds();
      },

      error: (error: any) => {

        console.error(
          'Error loading rooms:',
          error
        );

        this.toastService.showError(
          'Unable to load rooms.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  loadBeds(): void {

    this.bedService.getAllBeds().subscribe({

      next: (data: Bed[]) => {

        console.log(
          'BED API RESPONSE:',
          data
        );

        this.beds = data ?? [];

        this.calculateAvailableBeds();

        console.log(
          'BEDS ARRAY:',
          this.beds
        );

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error loading beds:',
          error
        );

        this.toastService.showError(
          'Unable to load beds.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  calculateAvailableBeds(): void {

    this.availableBeds =
      this.beds.filter(
        bed =>
          bed.status?.toUpperCase() ===
          'AVAILABLE'
      ).length;
  }

  getRoomNumber(bed: Bed): string {

    if (bed.room?.roomNumber) {
      return bed.room.roomNumber;
    }

    const room = this.rooms.find(
      r => r.id === bed.roomId
    );

    return room
      ? room.roomNumber
      : 'Unknown Room';
  }

  getHostelName(bed: Bed): string {

    if (bed.room?.hostel?.name) {
      return bed.room.hostel.name;
    }

    const room = this.rooms.find(
      r => r.id === bed.roomId
    );

    if (room?.hostel?.name) {
      return room.hostel.name;
    }

    return 'Unknown Hostel';
  }

  getStatusClass(status: string): string {

    switch (status?.toUpperCase()) {

      case 'AVAILABLE':
        return 'status-available';

      case 'OCCUPIED':
        return 'status-occupied';

      default:
        return 'status-default';
    }
  }

  editBed(id: number): void {

    this.router.navigate([
      '/dashboard/beds/edit',
      id
    ]);
  }

  deleteBed(id: number): void {

    if (this.deletingBedId !== null) {
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this bed?'
    );

    if (!confirmed) {
      return;
    }

    this.deletingBedId = id;

    this.bedService.deleteBed(id).subscribe({

      next: () => {

        this.beds = this.beds.filter(
          bed => bed.id !== id
        );

        this.calculateAvailableBeds();

        this.deletingBedId = null;

        this.toastService.showSuccess(
          'Bed deleted successfully.'
        );

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error deleting bed:',
          error
        );

        this.deletingBedId = null;

        this.toastService.showError(
          error?.error?.message ||
          'Failed to delete bed.'
        );

        this.cdr.detectChanges();

        this.loadBeds();
      }
    });
  }
}