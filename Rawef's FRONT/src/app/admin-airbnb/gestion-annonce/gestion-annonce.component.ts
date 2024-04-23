import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AnnonceService } from '../../shared/services/annonces.service';

@Component({
  selector: 'app-gestion-annonce',
  templateUrl: './gestion-annonce.component.html',
  styleUrl: './gestion-annonce.component.css'
})
export class GestionAnnonceComponent implements OnInit {
  annonces: any[] = [];
  selectedId : number = 0;

  modalRef!: BsModalRef ;
  newAnnonce: any = {}; 

  constructor(private modalService: BsModalService, private annonceService : AnnonceService) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.annonceService.getAllAnnouncements().subscribe(
      (announcements) => {
        this.annonces = announcements;
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



  deleteAnnonce() {
    this.annonceService.deleteAnnouncement(this.selectedId).subscribe(
      (announcements) => {
this.loadAnnouncements();
      },
      (error) => {
        console.error('Error loading announcements', error);
      }
    );  }
}
