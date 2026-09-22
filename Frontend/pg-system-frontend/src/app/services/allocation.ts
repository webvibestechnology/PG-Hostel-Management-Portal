import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Allocation } from '../models/allocation.model';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {

  private apiUrl = 'http://localhost:8080/api/allocations';

  constructor(private http: HttpClient) {}

  getAllAllocations(): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(this.apiUrl);
  }

  getAllocationById(id: number): Observable<Allocation> {
    return this.http.get<Allocation>(`${this.apiUrl}/${id}`);
  }

  getAllocationsByTenant(tenantId: number): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(`${this.apiUrl}/tenant/${tenantId}`);
  }

  addAllocation(allocation: Allocation): Observable<Allocation> {
    return this.http.post<Allocation>(this.apiUrl, allocation);
  }

  vacateAllocation(id: number): Observable<Allocation> {
    return this.http.put<Allocation>(`${this.apiUrl}/${id}/vacate`, {});
  }
}