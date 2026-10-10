import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Notice } from '../../../models/notice.model';
import { NoticeService } from '../../../services/notice';

import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-notice-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './notice-add.html',
  styleUrls: ['./notice-add.css']
})
export class NoticeAdd {

  notice: Notice = {
    title: '',
    content: '',
    createdBy: 1,
    targetAudience: 'ALL'
  };

  saving = false;

  successMessage = '';
  errorMessage = '';

  constructor(
    private noticeService: NoticeService,
    private router: Router,
    private toastService: ToastService
  ) {}

  // =========================
  // SAVE NOTICE
  // =========================

  saveNotice(): void {

    this.successMessage = '';
    this.errorMessage = '';

    this.notice.title =
      this.notice.title.trim();

    this.notice.content =
      this.notice.content.trim();

    // Title validation
    if (!this.notice.title) {

      this.errorMessage =
        'Please enter notice title.';

      this.toastService.showError(
        'Please enter notice title.'
      );

      return;
    }

    // Content validation
    if (!this.notice.content) {

      this.errorMessage =
        'Please enter notice content.';

      this.toastService.showError(
        'Please enter notice content.'
      );

      return;
    }

    if (this.saving) {
      return;
    }

    this.saving = true;

    const noticeToSave: Notice = {

      title:
        this.notice.title,

      content:
        this.notice.content,

      createdBy:
        this.getCreatedBy(),

      targetAudience:
        'ALL'
    };

    this.noticeService
      .addNotice(noticeToSave)
      .subscribe({

        next: () => {

          this.saving = false;

          this.toastService.showSuccess(
            'Notice created successfully.'
          );

          this.router.navigate([
            '/dashboard/notices'
          ]);
        },

        error: (error: any) => {

          console.error(
            'Error creating notice:',
            error
          );

          this.saving = false;

          this.errorMessage =
            error?.error?.message ||
            'Failed to create notice.';

          this.toastService.showError(
            error?.error?.message ||
            'Failed to create notice.'
          );
        }
      });
  }

  // =========================
  // GET ADMIN ID
  // =========================

  private getCreatedBy(): number {

    const storedAdminId =
      localStorage.getItem('adminId');

    if (storedAdminId) {

      const adminId =
        Number(storedAdminId);

      if (
        Number.isFinite(adminId) &&
        adminId > 0
      ) {
        return adminId;
      }
    }

    return 1;
  }

  // =========================
  // CANCEL
  // =========================

  cancel(): void {

    this.router.navigate([
      '/dashboard/notices'
    ]);
  }
}