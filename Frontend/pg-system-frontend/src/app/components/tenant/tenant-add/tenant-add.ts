import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TenantService } from '../../../services/tenant';
import { Tenant } from '../../../models/tenant.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-tenant-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-add.html',
  styleUrl: './tenant-add.css'
})
export class TenantAdd {

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

  errorMessage = '';
  saving = false;

  constructor(
    private tenantService: TenantService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  addTenant(): void {

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

    if (!this.isValidEmail(
      this.tenant.email.trim()
    )) {

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

    const tenantData: Tenant = {

      name: this.tenant.name.trim(),

      email: this.tenant.email.trim(),

      phone: this.tenant.phone.trim(),

      address: this.tenant.address.trim(),

      aadhaarNumber:
        this.tenant.aadhaarNumber.trim(),

      emergencyContact:
        this.tenant.emergencyContact.trim(),

      joinDate: '',

      status: 'ACTIVE'
    };

    this.saving = true;

    this.tenantService.addTenant(
      tenantData
    ).subscribe({

      next: () => {

        console.log(
          'Tenant added successfully'
        );

        this.saving = false;

        this.toastService.showSuccess(
          'Tenant added successfully.'
        );

        this.router.navigate([
          '/dashboard/tenants'
        ]);
      },

      error: (error: any) => {

        console.error(
          'Error adding tenant:',
          error
        );

        this.saving = false;

        this.errorMessage =
          error?.error?.message ||
          'Failed to add tenant. Please try again.';

        this.toastService.showError(
          error?.error?.message ||
          'Failed to add tenant. Please try again.'
        );

        this.cdr.detectChanges();
      }
    });
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