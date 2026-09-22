import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HostelService } from '../../../services/hostel';
import { Hostel } from '../../../models/hostel.model';

@Component({
  selector: 'app-hostel-edit',
  imports: [FormsModule],
  templateUrl: './hostel-edit.html',
  styleUrl: './hostel-edit.css'
})
export class HostelEdit implements OnInit {

  hostel: Hostel = {
    name: '',
    address: '',
    phone: '',
    totalRooms: 0,
    totalFloors: 0
  };

  hostelId!: number;

  constructor(
    private hostelService: HostelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hostelId = Number(this.route.snapshot.paramMap.get('id'));

    this.hostelService.getHostelById(this.hostelId).subscribe({
      next: (data) => {
        this.hostel = data;
      },
      error: (error) => {
        console.error('Error loading hostel:', error);
      }
    });
  }

  updateHostel(): void {
    this.hostelService.updateHostel(this.hostelId, this.hostel).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/hostels']);
      },
      error: (error) => {
        console.error('Error updating hostel:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/hostels']);
  }
}