import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { FormConnexionComponent } from './components/form-connexion/form-connexion.component';
import { HomeComponent } from './components/home/home.component';
import {MatTableModule} from '@angular/material/table';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JeuComponent } from './components/jeu/jeu.component';
import { AffichageScoreComponent } from './components/affichage-score/affichage-score.component';
import { AffichageScorePartieComponent } from './components/affichage-score-partie/affichage-score-partie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import {

  MatDialogRef,
 
} from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { AffichageClickDetailComponent } from './components/affichage-click-detail/affichage-click-detail.component';
@NgModule({
  declarations: [
    
    AppComponent,
    InscriptionFormComponent,
    FormConnexionComponent,
    HomeComponent,
    JeuComponent,
    AffichageScoreComponent,
    AffichageScorePartieComponent,
    AuthentificationComponent,
    AffichageClickDetailComponent
  ],
  imports: [
    MatPaginatorModule,
    MatInputModule, 
    MatTableModule,
    MatSortModule,
    // MatDialogTitle,
    // MatDialogContent,
    // MatDialogActions,
    // MatDialogClose,
    // MatDialogRef,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
