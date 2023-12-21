import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormConnexionComponent} from './components/form-connexion/form-connexion.component';
import {HomeComponent} from './components/home/home.component';

import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { JeuComponent } from './components/jeu/jeu.component';
const routes: Routes = [{
  path: '', component: HomeComponent
},{
  path : 'app-form-connexion', component: FormConnexionComponent
},{
  path:'app-inscription-form', component:InscriptionFormComponent
},{
  path:'app-jeu',component:JeuComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
