import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceColocService } from '../annonce-coloc.service';

@Component({
  selector: 'app-update-annonce-coloc',
  templateUrl: './update-annonce-coloc.component.html',
  styleUrls: ['./update-annonce-coloc.component.css']
})
export class UpdateAnnonceColocComponent implements OnInit {
  annonceColoc: any = {}; // Initialisation de l'annonce à mettre à jour

  constructor(
    private route: ActivatedRoute,
    private annonceColocService: AnnonceColocService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.getAnnonceDetails();
  }

  getAnnonceDetails(): void {
    const id = +this.route.snapshot.params['id']; // Récupérer l'identifiant de l'annonce depuis les paramètres de l'URL
    this.annonceColocService.getAnnonceColocById(id)
      .subscribe(annonce => this.annonceColoc = annonce);
  }

  updateAnnonce(): void {
    if (this.annonceColoc.id) { // Vérifiez si l'identifiant de l'annonce est défini
      this.annonceColocService.updateAnnonce(this.annonceColoc.id, this.annonceColoc)
        .subscribe(() => {
          console.log('Annonce mise à jour avec succès !');
          this.router.navigate(['/annoncesColoc/mesannonces']); // Redirige vers la liste des annonces après la mise à jour

        });
    } else {
      console.error("Impossible de mettre à jour l'annonce car l'identifiant est indéfini.");
    }
  }
  deleteAnnonce(): void {
    if (this.annonceColoc.id) { // Vérifiez si l'identifiant de l'annonce est défini
      if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
        this.annonceColocService.deleteAnnonce(this.annonceColoc.id)
          .subscribe(() => {
            console.log('Annonce supprimée avec succès !');
            this.router.navigate(['/annoncesColoc/mesannonces']); // Redirige vers la liste des annonces après la mise à jour

          });
      }
    } else {
      console.error("Impossible de supprimer l'annonce car l'identifiant est indéfini.");
    }
  }
}



