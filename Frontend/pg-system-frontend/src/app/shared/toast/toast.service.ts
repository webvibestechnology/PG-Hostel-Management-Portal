import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  type: ToastType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<ToastMessage>();

  toast$ = this.toastSubject.asObservable();

  showSuccess(message: string): void {
    this.toastSubject.next({
      type: 'success',
      message
    });
  }

  showError(message: string): void {
    this.toastSubject.next({
      type: 'error',
      message
    });
  }
}