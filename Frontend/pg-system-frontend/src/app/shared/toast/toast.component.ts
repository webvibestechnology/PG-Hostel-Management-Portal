import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastService, ToastType } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {

  visible = false;
  message = '';
  type: ToastType = 'success';

  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private toastSubscription?: Subscription;

  constructor(
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.toastSubscription =
      this.toastService.toast$.subscribe((toast) => {
        this.show(toast.message, toast.type);
      });
  }

  showSuccess(message: string): void {
    this.show(message, 'success');
  }

  showError(message: string): void {
    this.show(message, 'error');
  }

  private show(
    message: string,
    type: ToastType
  ): void {
    this.message = message;
    this.type = type;
    this.visible = true;

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.hideTimer = setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide(): void {
    this.visible = false;
    this.message = '';

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  ngOnDestroy(): void {
    this.toastSubscription?.unsubscribe();

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
  }
}