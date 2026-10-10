import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { HostelService } from '../../../services/hostel';
import { Hostel } from '../../../models/hostel.model';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-hostel-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './hostel-list.html',
  styleUrl: './hostel-list.css'
})
export class HostelList implements OnInit {
  successMessage = '';

  hostels: Hostel[] = [];

  deletingHostelId: number | null = null;

  constructor(
    private hostelService: HostelService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadHostels();
  }

  loadHostels(): void {

    this.hostelService.getAllHostels().subscribe({

      next: (data: Hostel[]) => {

        this.hostels = data ?? [];

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'HOSTEL API ERROR:',
          error
        );

        this.toastService.showError(
          error?.error?.message ||
          'Failed to load hostels.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  deleteHostel(id: number): void {

    if (this.deletingHostelId !== null) {
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this hostel?'
    );

    if (!confirmed) {
      return;
    }

    this.deletingHostelId = id;

    this.hostelService.deleteHostel(id).subscribe({

      next: () => {

        // Remove deleted hostel from UI
        this.hostels = this.hostels.filter(
          hostel => String(hostel.id) !== String(id)
        );

        this.deletingHostelId = null;

        // Success Toast
        this.toastService.showSuccess(
          'Hostel deleted successfully.'
        );

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Delete request error:',
          error
        );

        this.deletingHostelId = null;

        // Error Toast
        this.toastService.showError(
          error?.error?.message ||
          'Failed to delete hostel.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  editHostel(id: number): void {

    this.router.navigate([
      '/dashboard/hostels/edit',
      id
    ]);
  }
}