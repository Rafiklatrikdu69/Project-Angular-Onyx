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
  pageReloaded!:any
  ngOnInit(): void {
    setTimeout(()=>{

   
    let deco = document.getElementById('deco');
    deco?.addEventListener('click', this.deco.bind(this)); 
  },200) 
  }
  //deconnexion quand  je clique sur le bouton deconnexion 
  deco() {
    this.userService.deconnexion().subscribe(() => {
      console.log('Delete session !'); 
    });
    this.router.navigate(['/app-authentification','']);
    
    
  }
  //detecte la fermeture de la page pour deconnecter la session
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event:any): void {
    this.userService.deconnexion().subscribe();
  }
}
