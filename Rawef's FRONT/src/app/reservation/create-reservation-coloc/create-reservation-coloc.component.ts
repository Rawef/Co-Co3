import { Component, OnInit } from '@angular/core';
import { ReservationColocServiceService } from '../reservation-coloc-service.service';
import { AnnonceColocService } from '../../annoceColoc/annonce-coloc.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var hos: any;

@Component({
  selector: 'app-create-reservation-coloc',
  templateUrl: './create-reservation-coloc.component.html',
  styleUrls: ['./create-reservation-coloc.component.css']
})
export class CreateReservationColocComponent implements OnInit {
  reservation: any = {};
  annonceId: any;
  annonceColoc: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationColocServiceService,
    private annonceService: AnnonceColocService
  ) {}

  ngOnInit() {
    this.getAnnonceDetails();
  }

  getAnnonceDetails(): void {
    const id = +this.route.snapshot.params['id'];
    this.annonceService.getAnnonceColocById(id)
      .subscribe(annonce => this.annonceColoc = annonce);
  }

  private loadScript(scriptUrl: string) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
    script.onload = () => {
      hos.init('calendar', {
        onSelect: (date: Date) => {
          this.reservation.date = date;
        }
      });
    };
  }

  onSubmit() {
    if (this.annonceColoc) {
      this.reservationService.addReservation(this.annonceColoc.id, this.reservation).subscribe(
        (data) => {
          console.log('Réservation ajoutée avec succès !', data);
          this.reservation = {};
          this.router.navigate(['/page-precedente']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la réservation :', error);
        }
      );
    } else {
      console.error('Annonce non trouvée.');
    }
  }
}
