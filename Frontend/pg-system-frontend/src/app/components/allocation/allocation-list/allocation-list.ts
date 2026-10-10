import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AllocationService } from '../../../services/allocation';
import { Allocation } from '../../../models/allocation.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-allocation-list',
  imports: [CommonModule],
  templateUrl: './allocation-list.html',
  styleUrl: './allocation-list.css'
})
export class AllocationList implements OnInit {
  successMessage = '';

  allocations: Allocation[] = [];

  totalAllocations = 0;
  activeAllocations = 0;
  vacatedAllocations = 0;

  vacatingAllocationId: number | null = null;

  constructor(
    private allocationService: AllocationService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadAllocations();
  }

  loadAllocations(): void {

    this.allocationService
      .getAllAllocations()
      .subscribe({

        next: (data: Allocation[]) => {

          console.log(
            'ALLOCATION API RESPONSE:',
            data
          );

          this.allocations = data ?? [];

          this.calculateCounts();

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.error(
            'Error loading allocations:',
            error
          );

          this.toastService.showError(
            error?.error?.message ||
            'Unable to load allocations.'
          );

          this.cdr.detectChanges();
        }
      });
  }

  calculateCounts(): void {

    this.totalAllocations =
      this.allocations.length;

    this.activeAllocations =
      this.allocations.filter(
        allocation =>
          allocation.status?.toUpperCase() ===
          'ACTIVE'
      ).length;

    this.vacatedAllocations =
      this.allocations.filter(
        allocation =>
          allocation.status?.toUpperCase() ===
          'VACATED'
      ).length;
  }

  getTenantName(
    allocation: Allocation
  ): string {

    if (allocation.tenant?.name) {
      return allocation.tenant.name;
    }

    return 'Unknown Tenant';
  }

  getBedNumber(
    allocation: Allocation
  ): string {

    if (allocation.bed?.bedNumber) {
      return allocation.bed.bedNumber;
    }

    return 'Unknown Bed';
  }

  getRoomNumber(
    allocation: Allocation
  ): string {

    if (
      allocation.bed?.room?.roomNumber
    ) {
      return allocation.bed.room.roomNumber;
    }

    return 'Unknown Room';
  }

  getStatusClass(
    status: string
  ): string {

    switch (status?.toUpperCase()) {

      case 'ACTIVE':
        return 'status-active';

      case 'VACATED':
        return 'status-vacated';

      default:
        return 'status-default';
    }
  }

  formatDate(date?: string): string {

    if (!date) {
      return '-';
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );
  }

  addAllocation(): void {

    this.router.navigate([
      '/dashboard/allocations/add'
    ]);
  }

  vacateAllocation(id: number): void {

    if (this.vacatingAllocationId !== null) {
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to vacate this allocation?'
    );

    if (!confirmed) {
      return;
    }

    this.vacatingAllocationId = id;

    this.allocationService
      .vacateAllocation(id)
      .subscribe({

        next: (
          updatedAllocation: Allocation
        ) => {

          const allocation =
            this.allocations.find(
              item => item.id === id
            );

          if (allocation) {

            allocation.status =
              updatedAllocation?.status ||
              'VACATED';

            allocation.endDate =
              updatedAllocation?.endDate ||
              new Date()
                .toISOString()
                .split('T')[0];
          }

          this.calculateCounts();

          this.vacatingAllocationId = null;

          this.toastService.showSuccess(
            'Allocation vacated successfully.'
          );

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.error(
            'Error vacating allocation:',
            error
          );

          this.vacatingAllocationId = null;

          this.toastService.showError(
            error?.error?.message ||
            'Failed to vacate allocation.'
          );

          this.cdr.detectChanges();
        }
      });
  }

  trackByAllocationId(
    index: number,
    allocation: Allocation
  ): number | string {

    return allocation.id ?? index;
  }
}