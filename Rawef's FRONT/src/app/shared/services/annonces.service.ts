import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private apiUrl = 'http://localhost:8089/api/announcements'; 

  constructor(private http: HttpClient) {}

  getAllAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAnnouncementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAnnouncement(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateAnnouncement(id: number, updatedAnnouncement: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedAnnouncement);
  }

  deleteAnnouncement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  count(): Observable<any> {
    return this.http.get(`${this.apiUrl}/count`);
  }
}
