import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }
}