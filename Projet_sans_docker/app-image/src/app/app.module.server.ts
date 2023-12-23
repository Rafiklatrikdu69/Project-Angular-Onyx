import { NgModule } from '@angular/core';

import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    
    ServerModule,
    RouterLink,
    FormsModule,
    AppModule
  ],
 
  bootstrap: [AppComponent],
})
export class AppServerModule {}
