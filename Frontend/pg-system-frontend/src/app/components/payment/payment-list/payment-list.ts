import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PaymentService } from '../../../services/payment';
import { Payment } from '../../../models/payment.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-payment-list',
  imports: [CommonModule],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css'
})
export class PaymentList implements OnInit {

  payments: Payment[] = [];

  selectedFilter: 'ALL' | 'PAID' | 'PENDING' = 'ALL';

  totalAmount = 0;
  totalCollected = 0;
  totalRemaining = 0;

  paidCount = 0;
  pendingCount = 0;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {

    this.paymentService.getAllPayments().subscribe({

      next: (data: Payment[]) => {

        console.log(
          'PAYMENT API RESPONSE:',
          data
        );

        this.payments = data ?? [];

        this.calculateSummary();

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error loading payments:',
          error
        );

        this.toastService.showError(
          error?.error?.message ||
          'Unable to load payments.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  get filteredPayments(): Payment[] {

    if (this.selectedFilter === 'ALL') {
      return this.payments;
    }

    return this.payments.filter(
      payment =>
        this.getDisplayStatus(payment) ===
        this.selectedFilter
    );
  }

  /*
   * Status is calculated from Total Amount
   * and Amount Paid.
   *
   * Paid >= Total Amount → PAID
   * Paid < Total Amount  → PENDING
   */
  getDisplayStatus(
    payment: Payment
  ): 'PAID' | 'PENDING' {

    const total =
      this.getTotalAmount(payment);

    const paid =
      this.getPaidAmount(payment);

    if (
      total > 0 &&
      paid >= total
    ) {
      return 'PAID';
    }

    return 'PENDING';
  }

  calculateSummary(): void {

    this.totalAmount =
      this.payments.reduce(
        (total, payment) =>
          total +
          this.getTotalAmount(payment),
        0
      );

    /*
     * Total Collected = actual money received.
     * Partial payments are also included.
     */
    this.totalCollected =
      this.payments.reduce(
        (total, payment) =>
          total +
          this.getPaidAmount(payment),
        0
      );

    this.totalRemaining =
      this.payments.reduce(
        (total, payment) =>
          total +
          this.getRemainingAmount(payment),
        0
      );

    this.paidCount =
      this.payments.filter(
        payment =>
          this.getDisplayStatus(payment) ===
          'PAID'
      ).length;

    this.pendingCount =
      this.payments.filter(
        payment =>
          this.getDisplayStatus(payment) ===
          'PENDING'
      ).length;
  }

  getTotalAmount(
    payment: Payment
  ): number {

    return Number(
      payment.amount || 0
    );
  }

  getPaidAmount(
    payment: Payment
  ): number {

    return Number(
      payment.amountPaid || 0
    );
  }

  getRemainingAmount(
    payment: Payment
  ): number {

    const total =
      this.getTotalAmount(payment);

    const paid =
      this.getPaidAmount(payment);

    return Math.max(
      total - paid,
      0
    );
  }

  formatAmount(
    amount: number | undefined
  ): string {

    return Number(
      amount || 0
    ).toLocaleString(
      'en-IN',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );
  }

  formatPaymentDate(
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

  getTenantName(
    payment: Payment
  ): string {

    if (payment.tenant?.name) {
      return payment.tenant.name;
    }

    return 'Unknown Tenant';
  }

  getStatusClass(
    status: string
  ): string {

    switch (
      status?.toUpperCase()
    ) {

      case 'PAID':
        return 'status-paid';

      case 'PENDING':
        return 'status-pending';

      default:
        return 'status-default';
    }
  }

  getModeClass(
    mode?: string
  ): string {

    switch (
      mode?.toUpperCase()
    ) {

      case 'UPI':
        return 'mode-upi';

      case 'CASH':
        return 'mode-cash';

      case 'BANK_TRANSFER':
        return 'mode-bank';

      default:
        return 'mode-default';
    }
  }

  setFilter(
    filter: 'ALL' | 'PAID' | 'PENDING'
  ): void {

    this.selectedFilter = filter;

    this.cdr.detectChanges();
  }

  addPayment(): void {

    this.router.navigate([
      '/dashboard/payments/add'
    ]);
  }

  trackByPaymentId(
    index: number,
    payment: Payment
  ): number | string {

    return payment.id ?? index;
  }
}