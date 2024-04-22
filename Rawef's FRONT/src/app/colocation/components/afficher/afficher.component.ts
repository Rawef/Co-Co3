import { Component, OnInit } from '@angular/core';
import { ServiceColService } from '../../service/service-col.service';

@Component({
  selector: 'app-afficher',
  templateUrl: './afficher.component.html',
  styleUrl: './afficher.component.css'
})
export class AfficherComponent implements OnInit {



  annonces: any[] = []; 
  constructor(private serviceColService: ServiceColService){

  }

  ngOnInit(): void {
    this.getAnnoncesSelonPreferences();
  }

  getAnnoncesSelonPreferences(): void {
    this.serviceColService.getAnnoncesSelonPreferences()
      .subscribe(annonces => this.annonces = annonces);
  }

}
