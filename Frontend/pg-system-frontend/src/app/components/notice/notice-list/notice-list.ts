import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Notice } from '../../../models/notice.model';
import { NoticeService } from '../../../services/notice';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-notice-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-list.html',
  styleUrls: ['./notice-list.css']
})
export class NoticeList implements OnInit {

  notices: Notice[] = [];

  loading = false;
  deletingNoticeId: number | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(
    private noticeService: NoticeService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  // =========================
  // LOAD NOTICES
  // =========================
  loadNotices(): void {

    this.loading = true;
    this.errorMessage = '';

    this.noticeService.getAllNotices().subscribe({

      next: (data: Notice[]) => {

        this.notices = [...(data || [])];

        this.notices.sort(
          (a: Notice, b: Notice) => {

            const dateA = a.createdAt
              ? new Date(
                  a.createdAt
                ).getTime()
              : 0;

            const dateB = b.createdAt
              ? new Date(
                  b.createdAt
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
          'Error loading notices:',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          'Failed to load notices.';

        this.loading = false;

        this.toastService.showError(
          error?.error?.message ||
          'Failed to load notices.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  // =========================
  // ADD NOTICE
  // =========================
  addNotice(): void {

    this.router.navigate([
      '/dashboard/notices/add'
    ]);
  }

  // =========================
  // DELETE NOTICE
  // =========================
  deleteNotice(id: number): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this notice?'
    );

    if (!confirmed) {
      return;
    }

    this.deletingNoticeId = id;
    this.successMessage = '';
    this.errorMessage = '';

    this.noticeService.deleteNotice(id).subscribe({

      next: () => {

        this.notices =
          this.notices.filter(
            notice => notice.id !== id
          );

        this.deletingNoticeId = null;

        this.toastService.showSuccess(
          'Notice deleted successfully.'
        );

        this.cdr.detectChanges();
      },

      error: (error: any) => {

        console.error(
          'Error deleting notice:',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          'Failed to delete notice.';

        this.deletingNoticeId = null;

        this.toastService.showError(
          error?.error?.message ||
          'Failed to delete notice.'
        );

        this.cdr.detectChanges();
      }
    });
  }

  // =========================
  // FORMAT DATE
  // =========================
  formatDate(date?: string): string {

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
  // CONTENT PREVIEW
  // =========================
  getContentPreview(
    content: string
  ): string {

    if (!content) {
      return 'No content available.';
    }

    const cleanContent =
      content.trim();

    if (cleanContent.length <= 150) {
      return cleanContent;
    }

    return (
      cleanContent.substring(0, 150) +
      '...'
    );
  }

  // =========================
  // TRACK BY
  // =========================
  trackByNoticeId(
    index: number,
    notice: Notice
  ): number {

    return notice.id ?? index;
  }
}