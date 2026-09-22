import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  onLogin(): void {
  this.errorMessage = '';

  this.adminService
    .login({
      username: this.username.trim(),
      password: this.password
    })
    .subscribe({
      next: (admin) => {
        localStorage.setItem('admin', JSON.stringify(admin));
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.error('Login error:', error);

        if (error.status === 401 || error.status === 403) {
          this.errorMessage = 'Invalid username or password';
        } else if (error.status === 0) {
          this.errorMessage =
            'Backend server is not running. Please start Spring Boot.';
        } else {
          this.errorMessage =
            'Login failed. Please try again.';
        }
      }
    });
}
}