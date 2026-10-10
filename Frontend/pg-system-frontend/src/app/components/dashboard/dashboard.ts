import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { HostelService } from '../../services/hostel';
import { RoomService } from '../../services/room';
import { TenantService } from '../../services/tenant';
import { BedService } from '../../services/bed';
import { ComplaintService } from '../../services/complaint';
import { PaymentService } from '../../services/payment';
import { NoticeService } from '../../services/notice';

import { Notice } from '../../models/notice.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  adminName = 'Admin';

  totalHostels = 0;
  totalRooms = 0;
  totalActiveTenants = 0;
  availableBeds = 0;
  openComplaints = 0;
  pendingPayments = 0;

  recentNotices: Notice[] = [];

  loading = true;
  errorMessage = '';

  constructor(
    private hostelService: HostelService,
    private roomService: RoomService,
    private tenantService: TenantService,
    private bedService: BedService,
    private complaintService: ComplaintService,
    private paymentService: PaymentService,
    private noticeService: NoticeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAdminName();
    this.loadDashboardData();
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }

  /**
   * Show dashboard home only at /dashboard.
   * Child pages such as /dashboard/rooms will show
   * inside router-outlet instead.
   */
  get isDashboardHome(): boolean {
    return this.router.url === '/dashboard' ||
           this.router.url === '/dashboard/';
  }

  loadAdminName(): void {

    const adminName =
      localStorage.getItem('adminName') ||
      localStorage.getItem('username') ||
      localStorage.getItem('adminUsername');

    if (adminName) {
      this.adminName = adminName;
      return;
    }

    const adminData = localStorage.getItem('admin');

    if (adminData) {
      try {
        const admin = JSON.parse(adminData);

        this.adminName =
          admin?.name ||
          admin?.username ||
          'Admin';

      } catch {
        this.adminName = 'Admin';
      }
    }
  }

  loadDashboardData(): void {

    this.loading = true;
    this.errorMessage = '';

    /* ==========================
       HOSTELS
    ========================== */

    this.hostelService.getAllHostels().subscribe({
      next: (data: any[]) => {
        this.totalHostels = data?.length ?? 0;
      },

      error: (error: any) => {
        console.error(
          'Error loading hostels:',
          error
        );
      }
    });

    /* ==========================
       ROOMS
    ========================== */

    this.roomService.getAllRooms().subscribe({
      next: (data: any[]) => {
        this.totalRooms = data?.length ?? 0;
      },

      error: (error: any) => {
        console.error(
          'Error loading rooms:',
          error
        );
      }
    });

    /* ==========================
       ACTIVE TENANTS
    ========================== */

    this.tenantService.getActiveTenants().subscribe({
      next: (data: any[]) => {
        this.totalActiveTenants = data?.length ?? 0;
      },

      error: (error: any) => {
        console.error(
          'Error loading active tenants:',
          error
        );
      }
    });

    /* ==========================
       AVAILABLE BEDS
    ========================== */

    this.bedService.getAvailableBeds().subscribe({
      next: (data: any[]) => {
        this.availableBeds = data?.length ?? 0;
      },

      error: (error: any) => {
        console.error(
          'Error loading available beds:',
          error
        );
      }
    });

    /* ==========================
       OPEN COMPLAINTS
    ========================== */

    this.complaintService.getAllComplaints().subscribe({
      next: (data: any[]) => {

        const complaints = data || [];

        this.openComplaints = complaints.filter(
          (complaint: any) => {

            const status =
              String(complaint?.status || '')
                .trim()
                .toUpperCase()
                .replace(/\s+/g, '_');

            return (
              status === 'OPEN' ||
              status === 'IN_PROGRESS'
            );
          }
        ).length;
      },

      error: (error: any) => {
        console.error(
          'Error loading complaints:',
          error
        );
      }
    });

    /* ==========================
       PENDING PAYMENTS
    ========================== */

    this.paymentService.getAllPayments().subscribe({
      next: (data: any[]) => {

        const payments = data || [];

        this.pendingPayments = payments.filter(
          (payment: any) => {

            const status =
              String(payment?.status || '')
                .trim()
                .toUpperCase();

            return status === 'PENDING';
          }
        ).length;
      },

      error: (error: any) => {
        console.error(
          'Error loading payments:',
          error
        );
      }
    });

    /* ==========================
       RECENT NOTICES
    ========================== */

    this.noticeService.getAllNotices().subscribe({

      next: (data: Notice[]) => {

        const notices = [...(data || [])];

        notices.sort(
          (a: Notice, b: Notice) => {

            const dateA = a.createdAt
              ? new Date(a.createdAt).getTime()
              : 0;

            const dateB = b.createdAt
              ? new Date(b.createdAt).getTime()
              : 0;

            return dateB - dateA;
          }
        );

        this.recentNotices = notices.slice(0, 3);
      },

      error: (error: any) => {

        console.error(
          'Error loading notices:',
          error
        );

        this.errorMessage =
          'Unable to load recent notices.';
      }
    });

    // Prevent dashboard from remaining stuck on loading
    this.loading = false;
  }

  formatDate(date?: string): string {

    if (!date) {
      return '-';
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
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

  getNoticePreview(content: string): string {

    if (!content) {
      return 'No content available.';
    }

    const text = content.trim();

    if (text.length <= 120) {
      return text;
    }

    return text.substring(0, 120) + '...';
  }

  trackByNoticeId(
    index: number,
    notice: Notice
  ): number {

    return notice.id ?? index;
  }
}