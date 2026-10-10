import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HostelService } from '../../../services/hostel';
import { Hostel } from '../../../models/hostel.model';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-hostel-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './hostel-edit.html',
  styleUrl: './hostel-edit.css'
})
export class HostelEdit implements OnInit {

  hostel: Hostel = {
    name: '',
    address: '',
    phone: '',
    totalRooms: 0,
    totalFloors: 0
  };

  hostelId!: number;

  errorMessage = '';

  constructor(
    private hostelService: HostelService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.errorMessage =
        'Hostel ID not found.';

      this.toastService.showError(
        'Hostel ID not found.'
      );

      this.cdr.detectChanges();

      return;
    }

    this.hostelId = Number(id);

    this.loadHostel();
  }

  loadHostel(): void {

    this.hostelService
      .getHostelById(this.hostelId)
      .subscribe({

        next: (data: Hostel) => {

          console.log(
            'HOSTEL EDIT RESPONSE:',
            data
          );

          this.hostel = {
            id: data.id,
            name: data.name ?? '',
            address: data.address ?? '',
            phone: data.phone ?? '',
            totalRooms: data.totalRooms ?? 0,
            totalFloors: data.totalFloors ?? 0,
            createdAt: data.createdAt
          };

          // Force form to display loaded data immediately
          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.error(
            'Error loading hostel:',
            error
          );

          // BACKEND 404 - HOSTEL NOT FOUND
          if (error?.status === 404) {

            this.errorMessage =
              'Hostel not found.';

            this.toastService.showError(
              'Hostel not found. Redirecting to hostel list.'
            );

            this.cdr.detectChanges();

            this.router.navigate([
              '/dashboard/hostels'
            ]);

            return;
          }

          // OTHER SERVER ERRORS
          this.errorMessage =
            error?.error?.message ||
            'Unable to load hostel details.';

          this.toastService.showError(
            error?.error?.message ||
            'Unable to load hostel details.'
          );

          this.cdr.detectChanges();
        }
      });
  }

  updateHostel(): void {

    this.errorMessage = '';

    if (!this.hostel.name.trim()) {

      this.errorMessage =
        'Please enter hostel name.';

      this.toastService.showError(
        'Please enter hostel name.'
      );

      return;
    }

    if (!this.hostel.address.trim()) {

      this.errorMessage =
        'Please enter hostel address.';

      this.toastService.showError(
        'Please enter hostel address.'
      );

      return;
    }

    if (!this.hostel.phone.trim()) {

      this.errorMessage =
        'Please enter phone number.';

      this.toastService.showError(
        'Please enter phone number.'
      );

      return;
    }

    if (this.hostel.totalRooms < 1) {

      this.errorMessage =
        'Total rooms must be at least 1.';

      this.toastService.showError(
        'Total rooms must be at least 1.'
      );

      return;
    }

    if (this.hostel.totalFloors < 1) {

      this.errorMessage =
        'Total floors must be at least 1.';

      this.toastService.showError(
        'Total floors must be at least 1.'
      );

      return;
    }

    const hostelData: Hostel = {

      id: this.hostelId,

      name:
        this.hostel.name,

      address:
        this.hostel.address,

      phone:
        this.hostel.phone,

      totalRooms:
        this.hostel.totalRooms,

      totalFloors:
        this.hostel.totalFloors
    };

    this.hostelService
      .updateHostel(
        this.hostelId,
        hostelData
      )
      .subscribe({

        next: () => {

          console.log(
            'Hostel updated successfully'
          );

          this.toastService.showSuccess(
            'Hostel updated successfully.'
          );

          this.router.navigate([
            '/dashboard/hostels'
          ]);
        },

        error: (error: any) => {

          console.error(
            'Error updating hostel:',
            error
          );

          this.errorMessage =
            error?.error?.message ||
            'Failed to update hostel. Please try again.';

          this.toastService.showError(
            error?.error?.message ||
            'Failed to update hostel. Please try again.'
          );

          this.cdr.detectChanges();
        }
      });
  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/hostels'
    ]);
  }
}