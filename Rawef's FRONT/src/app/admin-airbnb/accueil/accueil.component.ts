import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../shared/services/annonces.service';
import { ReservationService } from '../../shared/services/reservation.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {

  nbrAnnonce : number =0;
  nbrResv: number =0;

  constructor(private reservationService : ReservationService, private annonceService : AnnonceService){

  }
  ngOnInit()  {
    this.reservationService.count().subscribe(
      (resp) => {
        this.nbrResv = resp;
      }
    );
    this.annonceService.count().subscribe(
      (resp) => {
        this.nbrAnnonce = resp;
      }
    );

  }
}
