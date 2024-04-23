import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReservationService } from '../../shared/services/reservation.service';
import { AnnonceService } from '../../shared/services/annonces.service';

@Component({
  selector: 'app-gestion-reservation',
  templateUrl: './gestion-reservation.component.html',
  styleUrl: './gestion-reservation.component.css'
})
export class GestionReservationComponent {
  reservations: any[] = [];
  selectedId : number = 0;
  adId : number | null = null;
  modalRef!: BsModalRef ;
  allReservations : any[]= [];

  constructor(private modalService: BsModalService, private reservationService : ReservationService) {}

  ngOnInit(): void {
    this.loadAllResv();
  }
  

  loadAllResv(): void {
    this.reservationService.getAllReservations().subscribe(
      (resp) => {
        this.reservations = resp;
        this.allReservations = resp;
      },
      (error) => {
        console.error('Error loading announcements', error);
      }
    );
  }

  openModal(template: TemplateRef<any>,id : number) {
    this.modalRef = this.modalService.show(template);
    this.selectedId = id;
  }



  deleteResv() {
    this.reservationService.deleteReservation(this.selectedId).subscribe(
      () => {
this.loadAllResv();
      },
      (error) => {
        console.error('Error loading announcements', error);
      }
    );  }

    
  filter() {
    
    this.reservations = this.allReservations.filter(
      (resv) =>
        (resv.annonceAirbnb.id == this.adId || this.adId == null)

    );
  }
}
