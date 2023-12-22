import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormConnexionComponent} from './components/form-connexion/form-connexion.component';
import {HomeComponent} from './components/home/home.component';

import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { AffichageScoreComponent } from './components/affichage-score/affichage-score.component';
import { AffichageScorePartieComponent } from './components/affichage-score-partie/affichage-score-partie.component';
const routes: Routes = [{
  path: '', component: HomeComponent
},{
  path : 'app-form-connexion', component: FormConnexionComponent
},{
  path:'app-inscription-form', component:InscriptionFormComponent
},{
  path:'app-jeu',component:JeuComponent
},{
  path: 'affichage-score', component:AffichageScoreComponent
},{
  path:'affichage-score-partie', component:AffichageScorePartieComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
