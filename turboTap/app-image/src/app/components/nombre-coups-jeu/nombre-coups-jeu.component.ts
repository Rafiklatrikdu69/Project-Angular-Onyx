import { Component } from '@angular/core';
import { UserService } from '../../modules/core-app-image/services/user.service';

@Component({
  selector: 'app-nombre-coups-jeu',
  templateUrl: './nombre-coups-jeu.component.html',
  styleUrl: './nombre-coups-jeu.component.scss'
})
export class NombreCoupsJeuComponent {
  constructor(private userService:UserService){}
  nbClick!:number
  ngOnInit(): void {
    
    this.userService.getNbClick().subscribe(data=>{
      this.nbClick = Object.assign(data);
      
    });
  }
}
