import { StatsComponent } from './aboutus/components/stats/stats.component';

import { LoginComponent } from './login/component/login/login.component';
import { PanierComponent } from './panier/component/panier/panier.component';
import { HomeComponent } from './home/component/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { PreferancesComponent } from './login/component/preferances/preferances.component';
import { ProfileComponent } from './login/component/profile/profile.component';
import { UpdateComponent } from './login/component/update/update.component';
import { SetPasswordComponent } from './login/component/set-password/set-password.component';
import { DashboardComponent } from './backoffice/components/dashboard/dashboard.component';
import { ChatComponent } from './chat/components/chat/chat.component';
import { AnnonceColocListComponent } from './annoceColoc/annonce-coloc-list/annonce-coloc-list.component';
import { CreateAnnonceColocComponent } from './annoceColoc/create-annonce-coloc/create-annonce-coloc.component';
import { MesAnnoncesComponent } from './annoceColoc/mes-annonces/mes-annonces.component';
import { AnnoceColocViewComponent } from './annoceColoc/annoce-coloc-view/annoce-coloc-view.component';
import { UpdateAnnonceColocComponent } from './annoceColoc/update-annonce-coloc/update-annonce-coloc.component';
import { CreateReservationColocComponent } from './reservation/create-reservation-coloc/create-reservation-coloc.component';

const routes: Routes = [

  {path:"home" , component:HomeComponent},
  {path:"panier" , component:PanierComponent},
  {path:"profile" , component:ProfileComponent},
  {path:"update" , component:UpdateComponent},
  {path:"password" , component:SetPasswordComponent},
  {path:"back" , component:DashboardComponent},
  {path:"login" , component:LoginComponent},
  { path: 'chat/:userId', component: ChatComponent },
  { path: "annoncesColoc", component: AnnonceColocListComponent }, // Utilisez le bon nom de composant
  { path: "annoncesColoc/add", component: CreateAnnonceColocComponent }, // Utilisez le bon nom de composant
  { path: "annoncesColoc/mesannonces", component: MesAnnoncesComponent }, // Utilisez le bon nom de composant
  { path: "annoncesColoc/view/:id", component: AnnoceColocViewComponent }, // Utilisez le bon nom de composant
  { path: "annoncesColoc/:id", component: UpdateAnnonceColocComponent }, // Utilisez le bon nom de composant
  { path: "annoncesColoc/view/:id/reservationColoc", component: CreateReservationColocComponent }, // Utilisez le bon nom de composant



  {path:"aboutus" , component:StatsComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:"preferances" , component:PreferancesComponent},
  //{path:"**",redirectTo:"home" ,pathMatch:"full"} 

  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
