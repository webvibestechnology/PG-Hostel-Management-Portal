import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/login`, credentials);
  }
}