import { Component } from '@angular/core';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.scss'
})
export class AuthentificationComponent {
  
  slide(){
    alert('Please enter')
  }
  isOpened: boolean=false;
  
  isOpen(){
    return this.isOpened;
  }
  
  toggle(){
    this.isOpened=!this.isOpened;
  }
}
