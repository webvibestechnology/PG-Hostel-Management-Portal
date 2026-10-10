import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TenantService } from '../../../services/tenant';
import { Tenant } from '../../../models/tenant.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-tenant-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-edit.html',
  styleUrl: './tenant-edit.css'
})
export class TenantEdit implements OnInit {

  tenant: Tenant = {
    name: '',
    email: '',
    phone: '',
    address: '',
    aadhaarNumber: '',
    emergencyContact: '',
    joinDate: '',
    status: 'ACTIVE'
  };

  tenantId!: number;

  errorMessage = '';

  saving = false;

  constructor(
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.errorMessage =
        'Tenant ID not found.';

      this.toastService.showError(
        'Tenant ID not found.'
      );

      this.cdr.detectChanges();
      return;
    }

    this.tenantId = Number(id);

    this.loadTenant();
  }

  loadTenant(): void {

    this.tenantService
      .getTenantById(this.tenantId)
      .subscribe({

        next: (data: Tenant) => {

          console.log(
            'TENANT EDIT RESPONSE:',
            data
          );

          this.tenant = {
            id: data.id,

            name:
              data.name ?? '',

            email:
              data.email ?? '',

            phone:
              data.phone ?? '',

            address:
              data.address ?? '',

            aadhaarNumber:
              data.aadhaarNumber ??
              (data as any).aadharNumber ??
              '',

            emergencyContact:
              data.emergencyContact ?? '',

            joinDate:
              data.joinDate ?? '',

            status:
              data.status ?? 'ACTIVE'
          };

          // Existing data should appear immediately
          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.error(
            'Error loading tenant:',
            error
          );

          // BACKEND 404 - TENANT NOT FOUND
          if (error?.status === 404) {

            this.errorMessage =
              'Tenant not found.';

            this.toastService.showError(
              'Tenant not found. Redirecting to tenant list.'
            );

            this.cdr.detectChanges();

            this.router.navigate([
              '/dashboard/tenants'
            ]);

            return;
          }

          // OTHER SERVER ERRORS
          this.errorMessage =
            error?.error?.message ||
            'Unable to load tenant details.';

          this.toastService.showError(
            error?.error?.message ||
            'Unable to load tenant details.'
          );

          this.cdr.detectChanges();
        }

      });
  }

  updateTenant(): void {

    this.errorMessage = '';

    if (this.saving) {
      return;
    }

    // Name validation
    if (!this.tenant.name.trim()) {

      this.errorMessage =
        'Please enter tenant name.';

      this.toastService.showError(
        'Please enter tenant name.'
      );

      return;
    }

    // Email validation
    if (!this.tenant.email.trim()) {

      this.errorMessage =
        'Please enter email address.';

      this.toastService.showError(
        'Please enter email address.'
      );

      return;
    }

    if (
      !this.isValidEmail(
        this.tenant.email.trim()
      )
    ) {

      this.errorMessage =
        'Please enter a valid email address.';

      this.toastService.showError(
        'Please enter a valid email address.'
      );

      return;
    }

    // Phone validation
    if (!this.tenant.phone.trim()) {

      this.errorMessage =
        'Please enter phone number.';

      this.toastService.showError(
        'Please enter phone number.'
      );

      return;
    }

    if (
      !/^[0-9]{10}$/.test(
        this.tenant.phone.trim()
      )
    ) {

      this.errorMessage =
        'Phone number must be exactly 10 digits.';

      this.toastService.showError(
        'Phone number must be exactly 10 digits.'
      );

      return;
    }

    // Address validation
    if (!this.tenant.address.trim()) {

      this.errorMessage =
        'Please enter address.';

      this.toastService.showError(
        'Please enter address.'
      );

      return;
    }

    // Aadhaar validation
    if (
      this.tenant.aadhaarNumber.trim() &&
      !/^[0-9]{12}$/.test(
        this.tenant.aadhaarNumber.trim()
      )
    ) {

      this.errorMessage =
        'Aadhaar number must be exactly 12 digits.';

      this.toastService.showError(
        'Aadhaar number must be exactly 12 digits.'
      );

      return;
    }

    // Emergency contact validation
    if (!this.tenant.emergencyContact.trim()) {

      this.errorMessage =
        'Please enter emergency contact.';

      this.toastService.showError(
        'Please enter emergency contact.'
      );

      return;
    }

    if (
      !/^[0-9]{10}$/.test(
        this.tenant.emergencyContact.trim()
      )
    ) {

      this.errorMessage =
        'Emergency contact must be exactly 10 digits.';

      this.toastService.showError(
        'Emergency contact must be exactly 10 digits.'
      );

      return;
    }

    /*
     * TenantRequest backend does not contain joinDate.
     * Also joinDate is updatable=false in the entity.
     * Therefore it is intentionally NOT included
     * in the actual update request.
     */

    const tenantData: Tenant = {

      name:
        this.tenant.name.trim(),

      email:
        this.tenant.email.trim(),

      phone:
        this.tenant.phone.trim(),

      address:
        this.tenant.address.trim(),

      aadhaarNumber:
        this.tenant.aadhaarNumber.trim(),

      emergencyContact:
        this.tenant.emergencyContact.trim(),

      joinDate:
        this.tenant.joinDate,

      status:
        this.tenant.status ?? 'ACTIVE'
    };

    this.saving = true;

    this.tenantService
      .updateTenant(
        this.tenantId,
        tenantData
      )
      .subscribe({

        next: () => {

          console.log(
            'Tenant updated successfully'
          );

          this.saving = false;

          this.toastService.showSuccess(
            'Tenant updated successfully.'
          );

          this.router.navigate([
            '/dashboard/tenants'
          ]);
        },

        error: (error: any) => {

          console.error(
            'Error updating tenant:',
            error
          );

          this.saving = false;

          this.errorMessage =
            error?.error?.message ||
            'Failed to update tenant. Please try again.';

          this.toastService.showError(
            error?.error?.message ||
            'Failed to update tenant. Please try again.'
          );

          this.cdr.detectChanges();
        }

      });
  }

  formatJoinDate(): string {

    if (!this.tenant.joinDate) {
      return 'Not available';
    }

    const date = new Date(
      this.tenant.joinDate
    );

    if (isNaN(date.getTime())) {
      return this.tenant.joinDate;
    }

    return date.toLocaleString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  }

  isValidEmail(email: string): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/tenants'
    ]);
  }
}