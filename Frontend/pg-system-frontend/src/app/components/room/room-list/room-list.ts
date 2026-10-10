import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { RoomService } from '../../../services/room';
import { HostelService } from '../../../services/hostel';

import { Room } from '../../../models/room.model';
import { Hostel } from '../../../models/hostel.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-room-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css'
})
export class RoomList implements OnInit {
  successMessage = '';

  rooms: Room[] = [];
  hostels: Hostel[] = [];

  deletingRoomId: number | null = null;

  constructor(
    private roomService: RoomService,
    private hostelService: HostelService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.hostelService.getAllHostels().subscribe({

      next: (hostels: Hostel[]) => {

        this.hostels = hostels ?? [];

        this.cdr.detectChanges();

        this.loadRooms();
      },

      error: (error: any) => {

        console.error(
          'Error loading hostels:',
          error
        );

        this.toastService.showError(
          'Unable to load hostels.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  loadRooms(): void {

    this.roomService.getAllRooms().subscribe({

      next: (data: Room[]) => {

        console.log(
          'ROOM API RESPONSE:',
          data
        );

        this.rooms = data ?? [];

        console.log(
          'ROOMS ARRAY:',
          this.rooms
        );

        this.cdr.detectChanges();
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

  getHostelName(room: Room): string {

    if (room.hostel?.name) {
      return room.hostel.name;
    }

    const hostel = this.hostels.find(
      h => h.id === room.hostelId
    );

    return hostel
      ? hostel.name
      : 'Unknown Hostel';
  }

  getStatusClass(status: string): string {

    switch (status?.toUpperCase()) {

      case 'AVAILABLE':
        return 'status-available';

      case 'OCCUPIED':
        return 'status-occupied';

      case 'MAINTENANCE':
        return 'status-maintenance';

      default:
        return 'status-default';
    }
  }

  editRoom(id: number): void {

    this.router.navigate([
      '/dashboard/rooms/edit',
      id
    ]);
  }

  deleteRoom(id: number): void {

    if (this.deletingRoomId !== null) {
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this room?'
    );

    if (!confirmed) {
      return;
    }

    this.deletingRoomId = id;

    this.roomService.deleteRoom(id).subscribe({

      next: () => {

        this.rooms = this.rooms.filter(
          room => room.id !== id
        );

        this.deletingRoomId = null;

        this.toastService.showSuccess(
          'Room deleted successfully.'
        );

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error deleting room:',
          error
        );

        this.deletingRoomId = null;

        this.toastService.showError(
          error?.error?.message ||
          'Failed to delete room.'
        );

        this.cdr.detectChanges();

        this.loadRooms();
      }
    });
  }
}