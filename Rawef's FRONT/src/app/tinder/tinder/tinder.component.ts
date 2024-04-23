import { TinderService } from './../tinder.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tinder',
  templateUrl: './tinder.component.html',
  styleUrl: './tinder.component.css'
})
export class TinderComponent {
  profiles: any[] = []; 
  constructor(private TinderService: TinderService) { }
  ngOnInit(): void {
    this.getAllProfiles();
    this.loadScripts();
   
  }

  private loadScripts() {
    const ionIconsScript = document.createElement('script');
    ionIconsScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
    document.body.appendChild(ionIconsScript);

    const nomoduleScript = document.createElement('script');
    nomoduleScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
    nomoduleScript.setAttribute('nomodule', '');
    document.body.appendChild(nomoduleScript);

    const cardScript = document.createElement('script');
    cardScript.src = 'assets/card.js';
    document.body.appendChild(cardScript);

    const scriptScript = document.createElement('script');
    scriptScript.src = 'assets/script.js';
    document.body.appendChild(scriptScript);
  }// Appel de la méthode pour récupérer tous les profils lors de l'initialisation du composant
  
  // Méthode pour créer un match si le like est mutuel
  createMatchIfMutualLike(likeDislike: any, userId: number, profilId: number) {
    this.TinderService.createMatchIfMutualLike(likeDislike, userId, profilId).subscribe(
      (response) => {
        console.log('Match créé avec succès :', response);
        // Traitez la réponse ici si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la création du match :', error);
        // Gérez l'erreur ici si nécessaire
      }
    );
  }

  // Méthode pour créer un profil
  createProfile(profileData: any) {
    this.TinderService.createProfile(profileData).subscribe(
      (response) => {
        console.log('Profil créé avec succès :', response);
        // Traitez la réponse ici si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la création du profil :', error);
        // Gérez l'erreur ici si nécessaire
      }
    );
  }
  getProfileById(profileId: number) {
    this.TinderService.getProfileById(profileId).subscribe(
      (response) => {
        console.log('Profil récupéré avec succès :', response);
        // Traitez la réponse ici si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil :', error);
        // Gérez l'erreur ici si nécessaire
      }
    );
  }
  getAllProfiles() {
    this.TinderService.getAllProfiles().subscribe(
      (response) => {
        console.log('Tous les profils récupérés avec succès :', response);
        this.profiles = response; // Assignez la réponse à la variable profiles
      },
      (error) => {
        console.error('Erreur lors de la récupération de tous les profils :', error);
      }
    );
  }
  // Méthode pour sauvegarder un like/dislike
  
  saveLikeDislike(like: boolean, userId: number, profileId: number) {
    // Convertir le booléen en MatchStatus enum
    const matchStatus = like ? 'LIKE' : 'DISLIKE';
    
    // Créer l'objet likeDislike à envoyer au service
    const likeDislike = {
      timestamp: new Date(), // Utilisez la date actuelle
      matchStatus: matchStatus,
    };
  
    // Appelez le service pour enregistrer le like ou le dislike
    this.TinderService.saveLikeDislike(likeDislike, userId, profileId).subscribe(
      (response) => {
        console.log('Like/dislike enregistré avec succès :', response);
        // Mettez à jour les profils après l'action de like/dislike
        this.getAllProfiles();
        // Vérifiez si c'est un like mutuel et créez un match
       
          this.createMatchIfMutualLike(likeDislike, userId, profileId);
          console.log('Match créé avec succès !');
        
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement du like/dislike :', error);
      }
    );
  }
  
  
  
}
