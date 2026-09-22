import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HostelService } from '../../../services/hostel';

@Component({
  selector: 'app-hostel-add',
  imports: [FormsModule],
  templateUrl: './hostel-add.html',
  styleUrl: './hostel-add.css'
})
export class HostelAdd {

  hostel = {
    name: '',
    address: '',
    phone: '',
    totalRooms: 0,
    totalFloors: 0
  };

  constructor(
    private hostelService: HostelService,
    private router: Router
  ) {}

  addHostel(): void {
    this.hostelService.addHostel(this.hostel).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/hostels']);
      },
      error: (error) => {
        console.error('Error adding hostel:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/hostels']);
  }
}