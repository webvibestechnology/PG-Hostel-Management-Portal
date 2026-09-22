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

  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.apiUrl);
  }

  getComplaintById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.apiUrl}/${id}`);
  }

  getOpenComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.apiUrl}/open`);
  }

  addComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(this.apiUrl, complaint);
  }

  updateComplaintStatus(id: number, status: string): Observable<Complaint> {
    return this.http.put<Complaint>(
      `${this.apiUrl}/${id}/status`,
      { status }
    );
  }
}