import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { Router } from '@angular/router';
import { Sessions } from '../../modules/core-app-image/models/Sessions';

import { GameService } from '../../modules/core-app-image/services/game.service';
import { Click } from '../../modules/core-app-image/models/Click';
import { User } from '../../modules/core-app-image/models/User';
import { dialog } from '../../modules/core-app-image/models/dialog';
import { NombreCoupsJeuComponent } from '../nombre-coups-jeu/nombre-coups-jeu.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrl: './jeu.component.scss',
  
})
export class JeuComponent {
  readonly myPix = [
    'assets/img1.png',
    'assets/img2.png',
  ];
  
  tabValMeilleurChrono: number[] = [];
  nbClickMax=3;
  tabPositionImage=[0];
  randomNumber = Math.floor(Math.random() * this.myPix.length);
  tab=[''];
  tabValeurChrono = []
  tabClicks:Click[] = []
  session!:string
  
  constructor(private userService:UserService,private router:Router,private gameService:GameService,private dialog:MatDialog){}
  ngAfterContentInit(): void {
    
    this.userService.getNbClick().subscribe(data=>{
      let nnClick = data;
      this.nbClickMax= Object.assign(nnClick);
    });
    this.userService.getSessionPseudo().subscribe(data=>{
      let session = new Sessions()
      session.verifsession(data,this.router,"app-authentification","app-jeu")
       
      if(session.getOuvertureDialog()){
        
        let dia = new dialog(this.dialog)
        dia.openDialog(NombreCoupsJeuComponent)
    
      }
      this.session = data//je garde la session
    });
    
    let img = document.getElementById('img');
    img?.setAttribute('src',this.myPix[this.randomNumber]); 
    //il faut changer le random pour pas deborder de la page 
   
      const randomX = Math.random() * (800);
 
      const randomY = Math.random() * (300);
      //on positionne les images 
      img!.style.position = 'absolute';
      img!.style.top = randomY + 'px';
      img!.style.left = randomX + 'px';
      img!.style.borderRadius = '10px'
    
    
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
    this.nbClick++;//incremente le nombre de clicks
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
      const avgVal = sumVal / this.tabValMeilleurChrono.length;//recupere la moyenne de tout les clicks
      this.gameService.insertDataPartie(this.session,Math.min(...this.tabValMeilleurChrono),avgVal, formattedDate).subscribe();//insere la partie
      this.gameService.insertInfoClick(this.tabClicks).subscribe()//insere les infos sur les clicks de la partie
      this.redirectionPage()
      
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
     
        const randomX = Math.random() * (500);
 
        const randomY = Math.random() * (300);
        img!.style.position = 'absolute';
        img!.style.top = randomY + 'px';
        img!.style.left = randomX + 'px';
        img!.style.borderRadius = '10px'
   
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
  redirectionPageRoute(self:boolean,urlToNavigateTo ?:string){
    console.log("route actuel:",this.router.url);
    const url=self ? this.router.url :urlToNavigateTo;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`apres la  navigation je suis sur :${this.router.url}`)
      })
    })
  }
  redirectionPage(){
    this.redirectionPageRoute(false,"affichage-score-partie");
  }
}
