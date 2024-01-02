import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { Router } from '@angular/router';
import { Sessions } from '../../modules/core-app-image/models/Sessions';

import { GameService } from '../../modules/core-app-image/services/game.service';
import { Click } from '../../modules/core-app-image/models/Click';
import { User } from '../../modules/core-app-image/models/User';

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
  
  tabValMeilleurChrono: number[] = [];
  nbClickMax=3;
  tabPositionImage=[0];
  randomNumber = Math.floor(Math.random() * this.myPix.length);
  tab=[''];
  tabValeurChrono = []
  tabClicks:Click[] = []
  session!:string

  constructor(private userService:UserService,private router:Router,private gameService:GameService){
    
  }
  ngOnInit(): void {
    
    this.userService.getNbClick().subscribe(data=>{
     
      let n = data;
      this.nbClickMax= Object.assign(n);
    });
      this.userService.getSessionPseudo().subscribe(data=>{
        console.log(data)
       let session = new Sessions()
       session.verifsession(data,this.router)
       this.session = data
    });

    let img = document.getElementById('img');
    img?.setAttribute('src',this.myPix[this.randomNumber]); 
    //il faut changer le random pour pas deborder de la page 
    document.addEventListener("DOMContentLoaded", function () {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      alert(screenHeight)
      const randomX = Math.floor(Math.random() * (screenWidth));
      const randomY = Math.floor(Math.random() * (screenHeight));
      img!.style.position = 'absolute';
      img!.style.top = randomY + 'px';
      img!.style.left = randomX + 'px';
    
    });
  
  
  }
  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;
  startTimer: any;
  running = false;
  nbClick = 0;
  previousClickTime = Date.now();
  partieTerminer = false;
  start() {
    
    this.nbClick++;
    if(this.nbClick==1){
      let c = new Click(12,this.nbClick,0);
      this.tabClicks.push(c)
    }
    if(this.nbClick==this.nbClickMax){
      this.partieTerminer = true;

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
      this.stop();
      const sumVal = this.tabValMeilleurChrono.reduce((accumulator, curr) => accumulator + curr, 0);
      const avgVal = sumVal / this.tabValMeilleurChrono.length;
      this.gameService.insertDataPartie(this.session,Math.min(...this.tabValMeilleurChrono),avgVal, formattedDate).subscribe();
      
    this.gameService.insertInfoClick(this.tabClicks).subscribe()
      this.reloadCurrent()
     
    }   
    if (!this.running) {
      this.previousClickTime = Date.now();
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
      const currentTime =  Date.now();
      const timeDifference = currentTime - this.previousClickTime;
      
      this.tab.push(`Temps entre les clics : ${timeDifference} ms`);
      let c = new Click(12,this.nbClick,timeDifference);
  
      this.tabClicks.push(c);
      this.tabValMeilleurChrono.push(timeDifference)
      this.resetTimer();

      
      this.randomNumber = Math.floor(Math.random() * this.myPix.length)

      let img = document.getElementById('img');
      img?.setAttribute('src', this.image());
      document.addEventListener("DOMContentLoaded", function () {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        alert(screenHeight)
        alert(screenWidth)
        const randomX = Math.floor(Math.random() * (screenHeight));
        const randomY = Math.floor(Math.random() * (screenWidth));
        img!.style.position = 'absolute';
        img!.style.top = randomY + 'px';
        img!.style.left = randomX + 'px';
      
      });
      this.previousClickTime = currentTime;
      
    }
    
  }
  
  stop() {
    clearInterval(this.startTimer);
    this.running = false;
  }
  resetTab(){
    this.tab.splice(0,this.tab.length-1);
  }
  image(){
    
    //  delete this.myPix[this.randomNumber];
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
  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:",this.router.url);
    const url=self ? this.router.url :urlToNavigateTo;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }
  reloadCurrent(){
    this.reloadComponent(false,"affichage-score-partie");
  }
}
