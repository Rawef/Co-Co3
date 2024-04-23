import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../shared/services/annonces.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent implements OnInit {
  annonces: any[] = [];
  allAnnonces: any[] = [];
  priceFilterForm!: FormGroup;

  constructor(private annonceService: AnnonceService, private fb: FormBuilder) {
    this.priceFilterForm = this.fb.group({
      minPrice: [null, Validators.min(0)],
      maxPrice: [null, Validators.min(0)],
      type: [null],
      nbrChambres: [null],

    });
  }
  ngOnInit(): void {
    this.getAllAnnonces();
  }

  filter() {
    const minPrice = this.priceFilterForm.get('minPrice')?.value;
    const maxPrice = this.priceFilterForm.get('maxPrice')?.value;
    const type = this.priceFilterForm.get('type')?.value;
    const nbrChambres = this.priceFilterForm.get('nbrChambres')?.value;

    this.annonces = this.allAnnonces.filter(
      (annonce) =>
        (minPrice === null || annonce.prix >= minPrice) &&
        (maxPrice === null || annonce.prix <= maxPrice) &&
        (nbrChambres === null || annonce.nbr_chambres === nbrChambres) &&
        (type === null || annonce.type === type)

    );
  }

  resetPriceFilter() {
    this.priceFilterForm.reset();
    this.getAllAnnonces();
  }


  getAllAnnonces() {
    this.annonceService.getAllAnnouncements().subscribe(
      (response: any) => {
        this.annonces = response;
        this.allAnnonces = response;
      },
      (error: any) => {
        console.error('An error occurred while creating the annonce:', error);
      }
    );
  }

}
