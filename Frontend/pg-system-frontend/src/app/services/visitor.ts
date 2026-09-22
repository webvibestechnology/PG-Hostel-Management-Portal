import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visitor } from '../models/visitor.model';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private apiUrl = 'http://localhost:8080/api/visitors';

  constructor(private http: HttpClient) {}

  getAllVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.apiUrl);
  }

  getVisitorById(id: number): Observable<Visitor> {
    return this.http.get<Visitor>(`${this.apiUrl}/${id}`);
  }

  getVisitorsByTenant(tenantId: number): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(
      `${this.apiUrl}/tenant/${tenantId}`
    );
  }

  addVisitor(visitor: Visitor): Observable<Visitor> {
    return this.http.post<Visitor>(this.apiUrl, visitor);
  }

  checkoutVisitor(id: number): Observable<Visitor> {
    return this.http.put<Visitor>(
      `${this.apiUrl}/${id}/checkout`,
      {}
    );
  }
}