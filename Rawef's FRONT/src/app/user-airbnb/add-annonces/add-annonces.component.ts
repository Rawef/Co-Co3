import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceService } from '../../shared/services/annonces.service';

@Component({
  selector: 'app-add-annonces',
  templateUrl: './add-annonces.component.html',
  styleUrl: './add-annonces.component.css'
})
export class AddAnnoncesComponent {

  annonceForm!: FormGroup ;
  file : any = null;
  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceService // Inject your service
  ) {}

  ngOnInit(): void {
    this.annonceForm = this.fb.group({
      image: [null],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      adresse: ['', Validators.required],
      nbrChambres: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
  onFileChange(event: any): void {
    this.file = event.target.files[0];

    
  }


  onSubmit(): void {
    if (this.annonceForm.valid && this.file != null) {
      const formData = new FormData();
      formData.append('image', this.file); 
      formData.append('titre', this.annonceForm.get('titre')?.value);
      formData.append('description', this.annonceForm.get('description')?.value);
      formData.append('prix', this.annonceForm.get('prix')?.value);
      formData.append('adresse', this.annonceForm.get('adresse')?.value);
      formData.append('nbr_chambres', this.annonceForm.get('nbrChambres')?.value);
      formData.append('type', this.annonceForm.get('type')?.value);
  
      // Call your service to submit the form data
      this.annonceService.createAnnouncement(formData).subscribe(
        (response : any) => {
window.location.reload()
        },
        (error : any) => {
          console.error('An error occurred while creating the annonce:', error);
        }
      );
    }
  }
  
}