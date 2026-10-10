import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AllocationService } from '../../../services/allocation';
import { TenantService } from '../../../services/tenant';
import { BedService } from '../../../services/bed';

import { Allocation } from '../../../models/allocation.model';
import { Tenant } from '../../../models/tenant.model';
import { Bed } from '../../../models/bed.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-allocation-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './allocation-add.html',
  styleUrl: './allocation-add.css'
})
export class AllocationAdd implements OnInit {

  allocation: Allocation = {
    tenantId: 0,
    bedId: 0,
    startDate: this.getTodayDate(),
    status: 'ACTIVE'
  };

  tenants: Tenant[] = [];
  beds: Bed[] = [];

  errorMessage = '';

  saving = false;

  loadingData = true;

  constructor(
    private allocationService: AllocationService,
    private tenantService: TenantService,
    private bedService: BedService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadDropdownData();
  }

  getTodayDate(): string {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      today.getDate()
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  loadDropdownData(): void {

    this.loadingData = true;

    this.tenantService.getActiveTenants().subscribe({

      next: (tenantData: Tenant[]) => {

        this.tenants = tenantData ?? [];

        this.loadAvailableBeds();
      },

      error: (error: any) => {

        console.error(
          'Error loading active tenants:',
          error
        );

        this.errorMessage =
          'Unable to load active tenants. Please try again.';

        this.loadingData = false;

        this.toastService.showError(
          'Unable to load active tenants. Please try again.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  loadAvailableBeds(): void {

    this.bedService.getAvailableBeds().subscribe({

      next: (bedData: Bed[]) => {

        console.log(
          'AVAILABLE BEDS:',
          bedData
        );

        this.beds = bedData ?? [];

        this.loadingData = false;

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error loading available beds:',
          error
        );

        this.errorMessage =
          'Unable to load available beds. Please try again.';

        this.loadingData = false;

        this.toastService.showError(
          'Unable to load available beds. Please try again.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  getBedLabel(bed: Bed): string {

    const bedNumber =
      bed.bedNumber || 'Unknown Bed';

    const roomNumber =
      bed.room?.roomNumber || 'Unknown Room';

    const hostelName =
      bed.room?.hostel?.name || 'Unknown Hostel';

    return `${bedNumber} - Room ${roomNumber} - ${hostelName}`;
  }

  addAllocation(): void {

    this.errorMessage = '';

    if (this.saving) {
      return;
    }

    // Tenant validation
    if (
      !this.allocation.tenantId ||
      this.allocation.tenantId === 0
    ) {

      this.errorMessage =
        'Please select an active tenant.';

      this.toastService.showError(
        'Please select an active tenant.'
      );

      return;
    }

    // Bed validation
    if (
      !this.allocation.bedId ||
      this.allocation.bedId === 0
    ) {

      this.errorMessage =
        'Please select an available bed.';

      this.toastService.showError(
        'Please select an available bed.'
      );

      return;
    }

    // Start date required validation
    if (!this.allocation.startDate) {

      this.errorMessage =
        'Please select allocation start date.';

      this.toastService.showError(
        'Please select allocation start date.'
      );

      return;
    }

    // Start date future validation
    const today = this.getTodayDate();

    if (this.allocation.startDate > today) {

      this.errorMessage =
        'Allocation start date cannot be in the future.';

      this.toastService.showError(
        'Allocation start date cannot be in the future.'
      );

      return;
    }

    const selectedTenant = this.tenants.find(
      tenant =>
        tenant.id === this.allocation.tenantId
    );

    if (!selectedTenant) {

      this.errorMessage =
        'Selected tenant could not be found.';

      this.toastService.showError(
        'Selected tenant could not be found.'
      );

      return;
    }

    const selectedBed = this.beds.find(
      bed =>
        bed.id === this.allocation.bedId
    );

    if (!selectedBed) {

      this.errorMessage =
        'Selected bed could not be found.';

      this.toastService.showError(
        'Selected bed could not be found.'
      );

      return;
    }

    const allocationData: Allocation = {

      tenantId:
        this.allocation.tenantId,

      bedId:
        this.allocation.bedId,

      startDate:
        this.allocation.startDate,

      status:
        'ACTIVE'
    };

    this.saving = true;

    this.allocationService
      .addAllocation(allocationData)
      .subscribe({

        next: (data: Allocation) => {

          console.log(
            'Allocation added successfully:',
            data
          );

          this.saving = false;

          this.toastService.showSuccess(
            'Allocation created successfully.'
          );

          this.router.navigate([
            '/dashboard/allocations'
          ]);
        },

        error: (error: any) => {

          console.error(
            'Error adding allocation:',
            error
          );

          this.saving = false;

          this.errorMessage =
            error?.error?.detail ||
            error?.error?.message ||
            'Failed to create allocation. Please try again.';

          this.toastService.showError(
            error?.error?.detail ||
            error?.error?.message ||
            'Failed to create allocation. Please try again.'
          );

          this.cdr.detectChanges();
        }
      });
  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/allocations'
    ]);
  }
}