import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from '../app/modules/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-image';
  users : User[]= [];
 constructor(private UserService:UserService){}
 ngOnInit() {
  this.UserService.getUser().subscribe((result:User[]) => (this.users = result , console.log(this.users)));
  console.log("test");
  
 };
}
