import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ComplaintService } from '../../../services/complaint';
import { TenantService } from '../../../services/tenant';

import { Complaint } from '../../../models/complaint.model';
import { Tenant } from '../../../models/tenant.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-complaint-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './complaint-add.html',
  styleUrl: './complaint-add.css'
})
export class ComplaintAdd implements OnInit {

  complaint: Complaint = {
    tenantId: 0,
    title: '',
    description: '',
    status: 'OPEN'
  };

  tenants: Tenant[] = [];

  loadingTenants = true;

  saving = false;

  errorMessage = '';

  constructor(
    private complaintService: ComplaintService,
    private tenantService: TenantService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants(): void {

    this.tenantService.getActiveTenants().subscribe({

      next: (data: Tenant[]) => {

        this.tenants = data ?? [];

        this.loadingTenants = false;

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error loading active tenants:',
          error
        );

        this.errorMessage =
          'Unable to load active tenants. Please try again.';

        this.loadingTenants = false;

        this.toastService.showError(
          'Unable to load active tenants. Please try again.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  addComplaint(): void {

    this.errorMessage = '';

    if (this.saving) {
      return;
    }

    // Tenant validation
    if (
      !this.complaint.tenantId ||
      this.complaint.tenantId === 0
    ) {

      this.errorMessage =
        'Please select a tenant.';

      this.toastService.showError(
        'Please select a tenant.'
      );

      return;
    }

    // Title validation
    if (!this.complaint.title.trim()) {

      this.errorMessage =
        'Please enter complaint title.';

      this.toastService.showError(
        'Please enter complaint title.'
      );

      return;
    }

    // Description validation
    if (!this.complaint.description.trim()) {

      this.errorMessage =
        'Please enter complaint description.';

      this.toastService.showError(
        'Please enter complaint description.'
      );

      return;
    }

    const complaintData: Complaint = {

      tenantId:
        this.complaint.tenantId,

      title:
        this.complaint.title.trim(),

      description:
        this.complaint.description.trim(),

      status:
        'OPEN'
    };

    this.saving = true;

    this.complaintService
      .addComplaint(complaintData)
      .subscribe({

        next: () => {

          this.saving = false;

          this.toastService.showSuccess(
            'Complaint filed successfully.'
          );

          this.router.navigate([
            '/dashboard/complaints'
          ]);
        },

        error: (error: any) => {

          console.error(
            'Error adding complaint:',
            error
          );

          this.saving = false;

          this.errorMessage =
            error?.error?.message ||
            error?.error?.detail ||
            'Failed to file complaint. Please try again.';

          this.toastService.showError(
            error?.error?.message ||
            error?.error?.detail ||
            'Failed to file complaint. Please try again.'
          );

          this.cdr.detectChanges();
        }
      });
  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/complaints'
    ]);
  }
}