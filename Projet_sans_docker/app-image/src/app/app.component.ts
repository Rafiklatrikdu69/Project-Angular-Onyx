import { Component } from '@angular/core';
import { UserService } from './modules/core-app-image/services/user.service';
import { User } from './modules/core-app-image/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Correction de la coquille ici (styleUrl -> styleUrls)
})
export class AppComponent {
  title = 'app-image';
  users: User[] = [];
  tab = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.userService.createTable().subscribe();
    this.userService.getUser().subscribe((result: User[]) => {
      this.users = result;
      console.log(this.users);
    });

    
  }
  
}
