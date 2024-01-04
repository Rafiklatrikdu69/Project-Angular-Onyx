import { Component } from '@angular/core';
import { UserService } from './modules/core-app-image/services/user.service';
import { User } from './modules/core-app-image/models/User';
import { LoaderService } from './modules/core-app-image/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Correction de la coquille ici (styleUrl -> styleUrls)
})
export class AppComponent {
  title = 'app-image';
  users: User[] = [];
  tab = [];

  constructor() {}

 

    

  ngOnInit(): void {
    setTimeout(()=>{

    },100)
  }
}
