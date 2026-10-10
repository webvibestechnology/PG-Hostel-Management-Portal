import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { VisitorRequest } from '../../../models/visitor.model';
import { Tenant } from '../../../models/tenant.model';

import { VisitorService } from '../../../services/visitor';
import { TenantService } from '../../../services/tenant';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-visitor-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './visitor-add.html',
  styleUrls: ['./visitor-add.css']
})
export class VisitorAdd implements OnInit {

  tenants: Tenant[] = [];

  visitor: VisitorRequest = {
    tenantId: 0,
    visitorname: '',
    visitorPhone: '',
    purpose: '',
    visitDate: this.getTodayDate(),
    checkInTime: this.getCurrentTime()
  };

  saving = false;

  successMessage = '';
  errorMessage = '';

  constructor(
    private visitorService: VisitorService,
    private tenantService: TenantService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants(): void {

    this.tenantService.getActiveTenants().subscribe({

      next: (data: Tenant[]) => {

        this.tenants = data || [];
      },

      error: (error: any) => {

        console.error(
          'Error loading tenants:',
          error
        );

        this.errorMessage =
          'Failed to load active tenants.';

        this.toastService.showError(
          'Failed to load active tenants.'
        );
      }
    });
  }

  saveVisitor(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.saving) {
      return;
    }

    // Tenant validation
    if (!this.visitor.tenantId) {

      this.errorMessage =
        'Please select a tenant.';

      this.toastService.showError(
        'Please select a tenant.'
      );

      return;
    }

    // Visitor name validation
    if (!this.visitor.visitorname.trim()) {

      this.errorMessage =
        'Please enter visitor name.';

      this.toastService.showError(
        'Please enter visitor name.'
      );

      return;
    }

    // Phone validation
    if (
  !/^[0-9]{10}$/.test(
    this.visitor.visitorPhone.trim()
  )
) {

  this.errorMessage =
    'Visitor phone must be exactly 10 digits.';

  this.toastService.showError(
    'Visitor phone must be exactly 10 digits.'
  );

  return;
}

    // Purpose validation
    if (!this.visitor.purpose.trim()) {

      this.errorMessage =
        'Please enter purpose.';

      this.toastService.showError(
        'Please enter purpose.'
      );

      return;
    }

    // Visit date validation
    if (!this.visitor.visitDate) {

      this.errorMessage =
        'Please select visit date.';

      this.toastService.showError(
        'Please select visit date.'
      );

      return;
    }

    // Check-in time validation
    if (!this.visitor.checkInTime) {

      this.errorMessage =
        'Please select check-in time.';

      this.toastService.showError(
        'Please select check-in time.'
      );

      return;
    }

    this.saving = true;

    const request: VisitorRequest = {

      tenantId:
        this.visitor.tenantId,

      visitorname:
        this.visitor.visitorname.trim(),

      visitorPhone:
        this.visitor.visitorPhone.trim(),

      purpose:
        this.visitor.purpose.trim(),

      visitDate:
        this.visitor.visitDate,

      checkInTime:
        this.visitor.checkInTime
    };

    this.visitorService
      .addVisitor(request)
      .subscribe({

        next: () => {

          this.saving = false;

          this.toastService.showSuccess(
            'Visitor added successfully.'
          );

          this.router.navigate([
            '/dashboard/visitors'
          ]);
        },

        error: (error: any) => {

          console.error(
            'Error adding visitor:',
            error
          );

          this.saving = false;

          this.errorMessage =
            error?.error?.message ||
            'Failed to add visitor.';

          this.toastService.showError(
            error?.error?.message ||
            'Failed to add visitor.'
          );
        }
      });
  }

  private getTodayDate(): string {

    const now = new Date();

    const year =
      now.getFullYear();

    const month =
      String(
        now.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        now.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private getCurrentTime(): string {

    const now = new Date();

    const hours =
      String(
        now.getHours()
      ).padStart(2, '0');

    const minutes =
      String(
        now.getMinutes()
      ).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/visitors'
    ]);
  }
}