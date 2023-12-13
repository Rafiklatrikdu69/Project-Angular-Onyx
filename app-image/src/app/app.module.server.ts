import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    
    ServerModule,
    RouterLink,
    FormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
