import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrl: './jeu.component.scss',
 
})
export class JeuComponent {
  readonly myPix = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/350',
    'https://via.placeholder.com/400',
  ];
  
  randomNumber = Math.floor(Math.random() * this.myPix.length);
  tab=[''];
  constructor(private userService:UserService){

  }
  ngOnInit(): void {
    this.userService.getSessionPseudo().subscribe(data=>{
      console.log(data)
      if(data==="pas de session !"){
        alert("il ya pas de session !")
      }
    });
    let img = document.getElementById('img');
    img?.setAttribute('src',this.myPix[this.randomNumber]); 
    img!.style.position = 'absolute';
     img!.style.top = document.body.clientHeight * Math.random() + 'px';
     img!.style.left = document.body.clientWidth * Math.random() + 'px';
    

  }
  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;
  startTimer: any;
  running = false;
  nbClick = 0;

  
  start() {
    this.nbClick++;
  
    if (!this.running) {
      this.running = true;
      this.randomNumber = Math.floor(Math.random() * this.myPix.length);
      let img = document.getElementById('img');
      img?.setAttribute('src', this.image());

    
      this.startTimer = setInterval(() => {
        this.ms++;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;
        if (this.ms === 100) {
          this.sec++;
          this.sec = this.ms < 10 ? '0' + this.sec : this.sec;
          this.ms = '0' + 0;
        }
        if (this.sec === 60) {
          this.min++;
          this.min = this.ms < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }
        if (this.min === 60) {
          this.hr++;
          this.hr = this.ms < 10 ? '0' + this.hr : this.hr;
          this.min = '0' + 0;
        }
      }, 10);
    } else {
      if (this.nbClick % 2 === 0) {
        this.tab.push("les heures "+this.hr+" "+"les min "+this.min+" "+" "+"les secondes "+this.sec+" "+"les ms "+this.ms)
        this.resetTimer()
        this.stop();
  
        this.randomNumber = Math.floor(Math.random() * this.myPix.length);
        let img = document.getElementById('img');
        img?.setAttribute('src', this.image());
        img!.style.position = 'absolute';
        img!.style.top = document.body.clientHeight * Math.random() + 'px';
        img!.style.left = document.body.clientWidth * Math.random() + 'px';
       
      }
    }
  }
  
  stop() {
    clearInterval(this.startTimer);
    this.running = false;
  }
  
  image(){
    const nextImage = this.myPix.shift(); 
    this.myPix.push(""+nextImage); 
    return nextImage || ''; 
  }
  resetTimer() {
    this.ms = '0' + 0;
    this.sec = '0' + 0;
    this.min = '0' + 0;
    this.hr = '0' + 0;
  }
}
