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
import { AfficherComponent } from './colocation/components/afficher/afficher.component';
import { ChatComponent } from './chat/components/chat/chat.component';


const routes: Routes = [

  {path:"home" , component:HomeComponent},
  {path:"panier" , component:PanierComponent},
  {path:"profile" , component:ProfileComponent},
  {path:"update" , component:UpdateComponent},
  {path:"password" , component:SetPasswordComponent},
  {path:"back" , component:DashboardComponent},
  {path:"login" , component:LoginComponent},
  {path:"annonceCol" , component:AfficherComponent},
  { path: 'chat/:userId', component: ChatComponent },



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
