import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private apiUrl = 'http://localhost:8080/api/complaints';

  constructor(private http: HttpClient) {}

  // Get all complaints
  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.apiUrl);
  }

  // Get complaint by ID
  getComplaintById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.apiUrl}/${id}`);
  }

  // Get open complaints
  getOpenComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.apiUrl}/open`);
  }

  // Add complaint
  addComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(this.apiUrl, complaint);
  }

  // Update complaint status
  updateComplaintStatus(
    id: number,
    status: string
  ): Observable<Complaint> {

    return this.http.put<Complaint>(
      `${this.apiUrl}/${id}/status?status=${encodeURIComponent(status)}`,
      {}
    );
  }
}