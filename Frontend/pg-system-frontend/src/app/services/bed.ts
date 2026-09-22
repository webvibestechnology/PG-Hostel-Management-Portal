import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bed } from '../models/bed.model';

@Injectable({
  providedIn: 'root'
})
export class BedService {

  private apiUrl = 'http://localhost:8080/api/beds';

  constructor(private http: HttpClient) {}

  getAllBeds(): Observable<Bed[]> {
    return this.http.get<Bed[]>(this.apiUrl);
  }

  getBedById(id: number): Observable<Bed> {
    return this.http.get<Bed>(`${this.apiUrl}/${id}`);
  }

  getBedsByRoom(roomId: number): Observable<Bed[]> {
    return this.http.get<Bed[]>(`${this.apiUrl}/room/${roomId}`);
  }

  getAvailableBeds(): Observable<Bed[]> {
    return this.http.get<Bed[]>(`${this.apiUrl}/available`);
  }

  addBed(bed: Bed): Observable<Bed> {
    return this.http.post<Bed>(this.apiUrl, bed);
  }

  updateBed(id: number, bed: Bed): Observable<Bed> {
    return this.http.put<Bed>(`${this.apiUrl}/${id}`, bed);
  }

  deleteBed(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}