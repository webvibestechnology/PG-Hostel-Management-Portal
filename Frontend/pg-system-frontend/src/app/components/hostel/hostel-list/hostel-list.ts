import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HostelService } from '../../../services/hostel';
import { Hostel } from '../../../models/hostel.model';

@Component({
  selector: 'app-hostel-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './hostel-list.html',
  styleUrl: './hostel-list.css'
})
export class HostelList implements OnInit {

  hostels: Hostel[] = [];

  constructor(
    private hostelService: HostelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHostels();
  }

  loadHostels(): void {
    this.hostelService.getAllHostels().subscribe({
      next: (data) => {
        this.hostels = data;
      },
      error: (error) => {
        console.error('Error loading hostels:', error);
      }
    });
  }

  deleteHostel(id: number): void {
    if (confirm('Delete this hostel?')) {
      this.hostelService.deleteHostel(id).subscribe({
        next: () => {
          this.loadHostels();
        },
        error: (error) => {
          console.error('Error deleting hostel:', error);
        }
      });
    }
  }

  editHostel(id: number): void {
    this.router.navigate(['/dashboard/hostels/edit', id]);
  }
}