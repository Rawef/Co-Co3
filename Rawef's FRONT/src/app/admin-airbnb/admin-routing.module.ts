import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionAnnonceComponent } from './gestion-annonce/gestion-annonce.component';
import { GestionReservationComponent } from './gestion-reservation/gestion-reservation.component';
import { AccueilComponent } from './accueil/accueil.component';


const adminRoutes: Routes = [
  { path: 'gestion-annonces', component: GestionAnnonceComponent },
  { path: 'reservations', component: GestionReservationComponent },
  {path:'home', component: AccueilComponent}

];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
