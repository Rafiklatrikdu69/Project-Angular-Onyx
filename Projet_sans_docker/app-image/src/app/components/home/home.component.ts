import { Component, HostListener } from '@angular/core';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    let deco = document.getElementById('deco');
    deco?.addEventListener('click', this.deco.bind(this));  
  }

  deco() {
    this.userService.deconnexion().subscribe(() => {
      console.log('Delete session !'); 
    });
     this.router.navigate(['/app-authentification','']);
  }
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event:any) {
 alert("jndjs")
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event:any) {
    alert("jndjs")
  }
}
