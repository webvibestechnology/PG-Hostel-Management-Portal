import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notice } from '../models/notice.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private apiUrl = 'http://localhost:8080/api/notices';

  constructor(private http: HttpClient) {}

  getAllNotices(): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.apiUrl);
  }

  getNoticeById(id: number): Observable<Notice> {
    return this.http.get<Notice>(`${this.apiUrl}/${id}`);
  }

  addNotice(notice: Notice): Observable<Notice> {
    return this.http.post<Notice>(this.apiUrl, notice);
  }

  deleteNotice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}