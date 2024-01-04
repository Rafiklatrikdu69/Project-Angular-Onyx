import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

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
  id!:any
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.id = this.route.snapshot.paramMap.get('id'))
  }
 constructor(private route: ActivatedRoute){}
  isOpened: boolean=false;
  isOpen!:any ;
 
  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)

  }
}
