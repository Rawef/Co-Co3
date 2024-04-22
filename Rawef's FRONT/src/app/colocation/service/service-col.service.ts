import { Injectable } from '@angular/core';
import { ServiceService } from '../../login/services/service.service';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceColService {

  private baseUrl = 'http://localhost:8089'; // Remplacez ceci par l'URL de votre API

  constructor(private service:ServiceService, private http:HttpClient) { }


  getAnnoncesSelonPreferences(): Observable<any[]> {
    return this.service.getLoggedInUser().pipe(
      switchMap(user => {
        const userId = user.id; // Récupérez l'ID de l'utilisateur connecté
        return this.http.get<any[]>(`${this.baseUrl}/api/annonces/preferences/${userId}`);
      })
    );
  }

  
}
