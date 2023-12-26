import { Component } from '@angular/core';
import { GameService } from '../../modules/core-app-image/services/game.service';
import { Click } from '../../modules/core-app-image/models/Click';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-affichage-score-partie',
  templateUrl: './affichage-score-partie.component.html',
  styleUrl: './affichage-score-partie.component.scss'
})
export class AffichageScorePartieComponent {
  clicks:Click[]=[];
  public cardsItems = [{cardNumber:1},{cardNumber:12},{cardNumber:24},{cardNumber:126},{cardNumber:45},{cardNumber:32},{cardNumber:1},{cardNumber:12},{cardNumber:24},{cardNumber:126},{cardNumber:45},{cardNumber:32},{cardNumber:1},{cardNumber:12},{cardNumber:24},{cardNumber:126},{cardNumber:45},{cardNumber:32}]
  public pageSlice !:Click[];
  constructor(private gameService:GameService){}
 
  ngOnInit(): void {
    console.log("debut !");
    this.gameService.getAllClick().subscribe((result:Click[])=>{
      this.clicks=result;
      this.pageSlice = this.clicks.slice(0,2)
      for(let  c of this.clicks){
        console.log(
          "Numero du click :"+c.numClick+"Numero de la partie :"+c.numPartie+ "Valeur du chrono :"+c.valClickChrono
          )
        }
      })
    }

    OnPageChange(event:PageEvent){
     console.log(event)
    
     const   debut = event.pageIndex * event.pageSize;
     let finIndex = debut + event.pageSize;
     if(finIndex > this.clicks.length){
       finIndex = this.clicks.length;
     }
        this.pageSlice =   this.clicks.slice(debut,finIndex)

     }
  

  
  }