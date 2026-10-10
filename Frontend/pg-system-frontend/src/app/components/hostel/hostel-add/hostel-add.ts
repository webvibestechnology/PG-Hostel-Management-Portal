import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HostelService } from '../../../services/hostel';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-hostel-add',
  imports: [CommonModule,FormsModule],
  templateUrl: './hostel-add.html',
  styleUrl: './hostel-add.css'
})
export class HostelAdd {

  hostel = {
    name: '',
    address: '',
    phone: '',
    totalRooms: 0,
    totalFloors: 0
  };

  constructor(
    private hostelService: HostelService,
    private router: Router,
    private toastService: ToastService
  ) {}

  addHostel(): void {

    this.hostelService.addHostel(this.hostel).subscribe({

      next: () => {

        this.toastService.showSuccess(
          'Hostel added successfully.'
        );

        this.router.navigate(['/dashboard/hostels']);
      },

      error: (error: any) => {

        console.error(
          'Error adding hostel:',
          error
        );

        this.toastService.showError(
          error?.error?.message ||
          'Failed to add hostel.'
        );
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/hostels']);
  }
}