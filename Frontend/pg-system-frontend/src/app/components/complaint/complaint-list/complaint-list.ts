import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Complaint } from '../../../models/complaint.model';
import { Tenant } from '../../../models/tenant.model';

import { ComplaintService } from '../../../services/complaint';
import { TenantService } from '../../../services/tenant';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-complaint-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './complaint-list.html',
  styleUrls: ['./complaint-list.css']
})
export class ComplaintList implements OnInit {

  complaints: Complaint[] = [];
  tenants: Tenant[] = [];

  selectedFilter:
    'ALL' |
    'OPEN' |
    'IN_PROGRESS' |
    'RESOLVED' = 'ALL';

  selectedStatuses: {
    [key: number]: string
  } = {};

  savingComplaintId: number | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(
    private complaintService: ComplaintService,
    private tenantService: TenantService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  // =========================
  // LOAD COMPLAINTS
  // =========================

  loadComplaints(): void {

    this.complaintService
      .getAllComplaints()
      .subscribe({

        next: (data: Complaint[]) => {

          this.complaints = data || [];

          this.initializeStatuses();

          this.loadTenants();
        },

        error: (error: any) => {

          console.error(
            'Error loading complaints:',
            error
          );

          this.errorMessage =
            'Failed to load complaints.';

          this.toastService.showError(
            error?.error?.message ||
            'Failed to load complaints.'
          );
        }
      });
  }

  // =========================
  // LOAD TENANTS
  // =========================

  loadTenants(): void {

    this.tenantService
      .getAllTenants()
      .subscribe({

        next: (data: Tenant[]) => {

          this.tenants = data || [];
        },

        error: (error: any) => {

          console.error(
            'Error loading tenants:',
            error
          );

          this.toastService.showError(
            'Unable to load tenants.'
          );
        }
      });
  }

  // =========================
  // INITIALIZE DROPDOWN STATUS
  // =========================

  initializeStatuses(): void {

    this.complaints.forEach(
      (complaint: Complaint) => {

        if (complaint.id !== undefined) {

          this.selectedStatuses[
            complaint.id
          ] =
            complaint.status || 'OPEN';
        }
      }
    );
  }

  // =========================
  // FILTERED COMPLAINTS
  // =========================

  get filteredComplaints(): Complaint[] {

    if (this.selectedFilter === 'ALL') {
      return this.complaints;
    }

    return this.complaints.filter(
      complaint =>
        complaint.status?.toUpperCase() ===
        this.selectedFilter
    );
  }

  // =========================
  // SET FILTER
  // =========================

  setFilter(
    filter:
      'ALL' |
      'OPEN' |
      'IN_PROGRESS' |
      'RESOLVED'
  ): void {

    this.selectedFilter = filter;
  }

  // =========================
  // TENANT NAME
  // =========================

  getTenantName(
    complaint: Complaint
  ): string {

    if (complaint.tenant?.name) {
      return complaint.tenant.name;
    }

    const tenant = this.tenants.find(
      t => t.id === complaint.tenantId
    );

    return tenant?.name ||
      'Unknown Tenant';
  }

  // =========================
  // STATUS CLASS
  // =========================

  getStatusClass(
    status: string
  ): string {

    switch (
      status?.toUpperCase()
    ) {

      case 'OPEN':
        return 'status-open';

      case 'IN_PROGRESS':
        return 'status-progress';

      case 'RESOLVED':
        return 'status-resolved';

      default:
        return '';
    }
  }

  // =========================
  // STATUS DISPLAY TEXT
  // =========================

  formatStatus(
    status: string
  ): string {

    if (!status) {
      return '-';
    }

    return status
      .toUpperCase()
      .replace('_', ' ');
  }

  // =========================
  // DATE FORMAT
  // =========================

  formatDate(
    date?: string
  ): string {

    if (!date) {
      return '-';
    }

    const parsedDate =
      new Date(date);

    if (
      isNaN(
        parsedDate.getTime()
      )
    ) {
      return '-';
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

  // =========================
  // UPDATE STATUS
  // =========================

  updateComplaintStatus(
    id: number
  ): void {

    const status =
      this.selectedStatuses[id];

    if (!status) {
      return;
    }

    this.savingComplaintId = id;

    this.successMessage = '';
    this.errorMessage = '';

    this.complaintService
      .updateComplaintStatus(
        id,
        status
      )
      .subscribe({

        next: (
          updatedComplaint: Complaint
        ) => {

          const complaint =
            this.complaints.find(
              c => c.id === id
            );

          if (complaint) {

            complaint.status =
              updatedComplaint.status;

            complaint.resolvedAt =
              updatedComplaint.resolvedAt;
          }

          this.selectedStatuses[id] =
            updatedComplaint.status;

          this.savingComplaintId = null;

          this.toastService.showSuccess(
            'Complaint status updated successfully.'
          );
        },

        error: (error: any) => {

          console.error(
            'Error updating complaint status:',
            error
          );

          this.errorMessage =
            error?.error?.message ||
            'Failed to update complaint status.';

          this.savingComplaintId = null;

          this.toastService.showError(
            error?.error?.message ||
            'Failed to update complaint status.'
          );
        }
      });
  }

  // =========================
  // ADD COMPLAINT
  // =========================

  addComplaint(): void {

    this.router.navigate([
      '/dashboard/complaints/add'
    ]);
  }

  // =========================
  // TRACK BY
  // =========================

  trackByComplaintId(
    index: number,
    complaint: Complaint
  ): number {

    return complaint.id ?? index;
  }

  // =========================
  // COUNTS
  // =========================

  get totalCount(): number {

    return this.complaints.length;
  }

  get openCount(): number {

    return this.complaints.filter(
      c =>
        c.status?.toUpperCase() ===
        'OPEN'
    ).length;
  }

  get inProgressCount(): number {

    return this.complaints.filter(
      c =>
        c.status?.toUpperCase() ===
        'IN_PROGRESS'
    ).length;
  }

  get resolvedCount(): number {

    return this.complaints.filter(
      c =>
        c.status?.toUpperCase() ===
        'RESOLVED'
    ).length;
  }
}