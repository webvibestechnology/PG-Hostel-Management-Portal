import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Visitor } from '../../../models/visitor.model';
import { Tenant } from '../../../models/tenant.model';

import { VisitorService } from '../../../services/visitor';
import { TenantService } from '../../../services/tenant';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-visitor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visitor-list.html',
  styleUrls: ['./visitor-list.css']
})
export class VisitorList implements OnInit {

  visitors: Visitor[] = [];
  tenants: Tenant[] = [];

  loading = false;
  checkingOutVisitorId: number | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(
    private visitorService: VisitorService,
    private tenantService: TenantService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadVisitors();
    this.loadTenants();
  }

  loadVisitors(): void {

    this.loading = true;
    this.errorMessage = '';

    this.visitorService.getAllVisitors().subscribe({

      next: (data: Visitor[]) => {

        this.visitors = [...(data || [])];

        this.visitors.sort(
          (a: Visitor, b: Visitor) => {

            const dateA = a.checkInTime
              ? new Date(
                  a.checkInTime
                ).getTime()
              : 0;

            const dateB = b.checkInTime
              ? new Date(
                  b.checkInTime
                ).getTime()
              : 0;

            return dateB - dateA;
          }
        );

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error loading visitors:',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          'Failed to load visitors.';

        this.loading = false;

        this.toastService.showError(
          error?.error?.message ||
          'Failed to load visitors.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  loadTenants(): void {

    this.tenantService.getAllTenants().subscribe({

      next: (data: Tenant[]) => {

        this.tenants = data || [];

        this.cdr.detectChanges();
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

  addVisitor(): void {

    this.router.navigate([
      '/dashboard/visitors/add'
    ]);
  }

  getTenantName(
    visitor: Visitor
  ): string {

    if (visitor.tenant?.name) {
      return visitor.tenant.name;
    }

    const tenant = this.tenants.find(
      t => t.id === visitor.tenantId
    );

    return tenant?.name ||
      'Unknown Tenant';
  }

  checkoutVisitor(id: number): void {

    const confirmed =
      window.confirm(
        'Are you sure you want to check out this visitor?'
      );

    if (!confirmed) {
      return;
    }

    this.checkingOutVisitorId = id;
    this.successMessage = '';
    this.errorMessage = '';

    this.visitorService
      .checkoutVisitor(id)
      .subscribe({

        next: (
          updatedVisitor: Visitor
        ) => {

          const index =
            this.visitors.findIndex(
              visitor =>
                visitor.id === id
            );

          if (index !== -1) {
            this.visitors[index] =
              updatedVisitor;
          }

          this.checkingOutVisitorId = null;

          this.toastService.showSuccess(
            'Visitor checked out successfully.'
          );

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.error(
            'Error checking out visitor:',
            error
          );

          this.checkingOutVisitorId = null;

          this.errorMessage =
            error?.error?.message ||
            'Failed to check out visitor.';

          this.toastService.showError(
            error?.error?.message ||
            'Failed to check out visitor.'
          );

          this.cdr.detectChanges();
        }
      });
  }

  formatDate(
    date?: string
  ): string {

    if (!date) {
      return '-';
    }

    const parts =
      date
        .split('T')[0]
        .split('-');

    if (parts.length !== 3) {
      return '-';
    }

    const year =
      Number(parts[0]);

    const month =
      Number(parts[1]) - 1;

    const day =
      Number(parts[2]);

    const parsedDate =
      new Date(
        year,
        month,
        day
      );

    return parsedDate.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );
  }

  formatTime(
    dateTime?: string | null
  ): string {

    if (!dateTime) {
      return '-';
    }

    const parsedDate =
      new Date(dateTime);

    if (
      isNaN(
        parsedDate.getTime()
      )
    ) {
      return '-';
    }

    return parsedDate.toLocaleTimeString(
      'en-IN',
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  }

  trackByVisitorId(
    index: number,
    visitor: Visitor
  ): number {

    return visitor.id ?? index;
  }
}