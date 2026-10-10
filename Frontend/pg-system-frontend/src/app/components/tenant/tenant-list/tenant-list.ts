import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TenantService } from '../../../services/tenant';
import { Tenant } from '../../../models/tenant.model';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-tenant-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-list.html',
  styleUrl: './tenant-list.css'
})
export class TenantList implements OnInit {
  successMessage = '';

  tenants: Tenant[] = [];

  showActiveOnly = false;

  deletingTenantId: number | null = null;

  constructor(
    private tenantService: TenantService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants(): void {

    this.tenantService.getAllTenants().subscribe({

      next: (data: Tenant[]) => {

        console.log(
          'TENANT API RESPONSE:',
          data
        );

        this.tenants = data ?? [];

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error loading tenants:',
          error
        );

        this.toastService.showError(
          error?.error?.message ||
          'Unable to load tenants.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  get filteredTenants(): Tenant[] {

    if (!this.showActiveOnly) {
      return this.tenants;
    }

    return this.tenants.filter(
      tenant =>
        tenant.status === 'ACTIVE'
    );
  }

  get totalTenants(): number {
    return this.tenants.length;
  }

  get activeTenants(): number {

    return this.tenants.filter(
      tenant =>
        tenant.status === 'ACTIVE'
    ).length;
  }

  get inactiveTenants(): number {

    return this.tenants.filter(
      tenant =>
        tenant.status === 'INACTIVE'
    ).length;
  }

  getStatusClass(
    status?: string
  ): string {

    switch (
      status?.toUpperCase()
    ) {

      case 'ACTIVE':
        return 'status-active';

      case 'INACTIVE':
        return 'status-inactive';

      default:
        return 'status-default';
    }
  }

  editTenant(id: number): void {

    this.router.navigate([
      '/dashboard/tenants/edit',
      id
    ]);
  }

  deleteTenant(id: number): void {

    if (this.deletingTenantId !== null) {
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to deactivate this tenant?'
    );

    if (!confirmed) {
      return;
    }

    this.deletingTenantId = id;

    this.tenantService.deleteTenant(id).subscribe({

      next: () => {

        /*
         * Soft delete:
         * Do NOT remove tenant from array.
         * Only change status to INACTIVE.
         */

        const tenant =
          this.tenants.find(
            item => item.id === id
          );

        if (tenant) {
          tenant.status = 'INACTIVE';
        }

        this.deletingTenantId = null;

        this.toastService.showSuccess(
          'Tenant deactivated successfully.'
        );

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error deactivating tenant:',
          error
        );

        this.deletingTenantId = null;

        this.toastService.showError(
          error?.error?.message ||
          'Failed to deactivate tenant.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  addTenant(): void {

    this.router.navigate([
      '/dashboard/tenants/add'
    ]);
  }

  trackByTenantId(
    index: number,
    tenant: Tenant
  ): number | string {

    return tenant.id ?? index;
  }
}