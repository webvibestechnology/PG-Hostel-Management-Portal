import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PaymentService } from '../../../services/payment';
import { TenantService } from '../../../services/tenant';

import { Payment } from '../../../models/payment.model';
import { Tenant } from '../../../models/tenant.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-payment-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-add.html',
  styleUrl: './payment-add.css'
})
export class PaymentAdd implements OnInit {

  payment: Payment = {
    tenantId: 0,
    amount: 0,
    amountPaid: 0,
    paymentDate: this.getTodayDate(),
    paymentMonth: '',
    paymentMode: 'UPI',
    status: 'Pending',
    remarks: ''
  };

  tenants: Tenant[] = [];

  errorMessage = '';
  saving = false;
  loadingTenants = true;

  constructor(
    private paymentService: PaymentService,
    private tenantService: TenantService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadTenants();
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

  loadTenants(): void {

    this.loadingTenants = true;

    this.tenantService.getActiveTenants().subscribe({

      next: (data: Tenant[]) => {

        this.tenants = data ?? [];

        this.loadingTenants = false;

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error loading tenants:',
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

  getRemainingAmount(): number {

    const total =
      Number(this.payment.amount || 0);

    const paid =
      Number(this.payment.amountPaid || 0);

    return Math.max(
      total - paid,
      0
    );
  }

  updateStatus(): void {

    const total =
      Number(this.payment.amount || 0);

    const paid =
      Number(this.payment.amountPaid || 0);

    if (
      total > 0 &&
      paid >= total
    ) {

      this.payment.status = 'Paid';

    } else {

      this.payment.status = 'Pending';
    }
  }

  addPayment(): void {

    this.errorMessage = '';

    if (this.saving) {
      return;
    }

    const totalAmount =
      Number(this.payment.amount || 0);

    const paidAmount =
      Number(this.payment.amountPaid || 0);

    // Tenant validation
    if (
      !this.payment.tenantId ||
      this.payment.tenantId === 0
    ) {

      this.errorMessage =
        'Please select a tenant.';

      this.toastService.showError(
        'Please select a tenant.'
      );

      return;
    }

    // Total amount validation
    if (totalAmount <= 0) {

      this.errorMessage =
        'Total amount must be greater than zero.';

      this.toastService.showError(
        'Total amount must be greater than zero.'
      );

      return;
    }

    // Paid amount validation
    if (paidAmount < 0) {

      this.errorMessage =
        'Amount paid cannot be negative.';

      this.toastService.showError(
        'Amount paid cannot be negative.'
      );

      return;
    }

    if (paidAmount > totalAmount) {

      this.errorMessage =
        'Amount paid cannot be greater than total amount.';

      this.toastService.showError(
        'Amount paid cannot be greater than total amount.'
      );

      return;
    }

    // Payment date validation
    if (!this.payment.paymentDate) {

      this.errorMessage =
        'Please select payment date.';

      this.toastService.showError(
        'Please select payment date.'
      );

      return;
    }

    // Payment month validation
    if (
      !this.payment.paymentMonth.trim()
    ) {

      this.errorMessage =
        'Please enter payment month.';

      this.toastService.showError(
        'Please enter payment month.'
      );

      return;
    }

    // Payment mode validation
    if (!this.payment.paymentMode) {

      this.errorMessage =
        'Please select payment mode.';

      this.toastService.showError(
        'Please select payment mode.'
      );

      return;
    }

    const selectedTenant =
      this.tenants.find(
        tenant =>
          tenant.id ===
          this.payment.tenantId
      );

    if (!selectedTenant) {

      this.errorMessage =
        'Selected tenant could not be found.';

      this.toastService.showError(
        'Selected tenant could not be found.'
      );

      return;
    }

    // Automatically calculate Paid/Pending
    this.updateStatus();

    const paymentData: Payment = {

      tenantId:
        this.payment.tenantId,

      amount:
        totalAmount,

      amountPaid:
        paidAmount,

      paymentDate:
        this.payment.paymentDate,

      paymentMonth:
        this.payment.paymentMonth.trim(),

      paymentMode:
        this.payment.paymentMode,

      status:
        this.payment.status,

      remarks:
        this.payment.remarks?.trim() || ''
    };

    this.saving = true;

    this.paymentService
      .addPayment(paymentData)
      .subscribe({

        next: () => {

          console.log(
            'Payment added successfully'
          );

          this.saving = false;

          this.toastService.showSuccess(
            'Payment recorded successfully.'
          );

          this.router.navigate([
            '/dashboard/payments'
          ]);
        },

        error: (error: any) => {

          console.error(
            'Error adding payment:',
            error
          );

          this.saving = false;

          this.errorMessage =
            error?.error?.message ||
            error?.error?.detail ||
            'Failed to record payment. Please try again.';

          this.toastService.showError(
            error?.error?.message ||
            error?.error?.detail ||
            'Failed to record payment. Please try again.'
          );

          this.cdr.detectChanges();
        }
      });
  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/payments'
    ]);
  }
}