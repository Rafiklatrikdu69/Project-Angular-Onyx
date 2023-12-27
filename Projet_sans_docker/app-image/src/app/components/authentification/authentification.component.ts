import { Component } from '@angular/core';

import { trigger, state, style, transition, animate, group } from '@angular/animations';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',

  styleUrl: './authentification.component.scss',
  animations: [
    trigger('toggleBox', [
     
      transition('open => closed', [
        
        style({transform: 'rotateY(-180deg)'}),
        animate('.5s')
      
      ]),
      transition('closed => open', [
        style({transform: 'rotateY(180deg)'}),
        animate('0.5s')
      ]),
    ])
  ]
})
export class AuthentificationComponent {
  
 
  isOpened: boolean=false;
  isOpen!:any ;
  // isOpen(){
  //   return this.isOpened;
  // }
  
  // toggle(){
  //   this.isOpened=!this.isOpened;
  // }
  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)

  }
}
