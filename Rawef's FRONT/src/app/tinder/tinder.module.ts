import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinderComponent } from './tinder/tinder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    TinderComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    BrowserModule,
    HammerModule

  ],
  exports: [TinderComponent,
  ] // Ajoutez cette ligne
})
export class TinderModule { }