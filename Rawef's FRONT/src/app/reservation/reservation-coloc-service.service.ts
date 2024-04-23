import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importez HttpClient pour effectuer des requêtes HTTP
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationColocServiceService {
  private apiUrl = 'http://localhost:8080/api/reservations-coloc'; // URL de votre API Spring

  constructor(private http: HttpClient) { }

  // Méthode pour ajouter une réservation
  addReservation(annonceId: number, reservation: any): Observable<any> {
    const url = `${this.apiUrl}/${annonceId}`;
    return this.http.post<any>(url, reservation);
  }

}
