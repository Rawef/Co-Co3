import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfficherComponent } from './components/afficher/afficher.component';



@NgModule({
  declarations: [
    AfficherComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AfficherComponent
  ]

})
export class ColocationModule { }
