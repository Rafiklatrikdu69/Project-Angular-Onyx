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
  public cardsItems = [{cardNumber:1},{cardNumber:12},{cardNumber:24},{cardNumber:126},{cardNumber:45},{cardNumber:32},{cardNumber:1},{cardNumber:12},{cardNumber:24},{cardNumber:126},{cardNumber:45},{cardNumber:32},{cardNumber:1},{cardNumber:12},{cardNumber:24},{cardNumber:126},{cardNumber:45},{cardNumber:32}]
  public pageSlice = this.cardsItems.slice(0,3);
  constructor(private gameService:GameService){}
  clicks:Click[]=[];
  ngOnInit(): void {
    alert("Debut !")
    console.log("debut !");
    this.gameService.getAllClick().subscribe((result:Click[])=>{
      this.clicks=result;
      for(let  c of this.clicks){
        console.log(
          "Numero du click :"+c.numClick+"Numero de la partie :"+c.numPartie+ "Valeur du chrono :"+c.valClickChrono
          )
        }
        //this.gameService.insertInfoClick(this.clicks).subscribe();
      })
    }

    OnPageChange(event:PageEvent){
     console.log(event)
    
     const   debut = event.pageIndex * event.pageSize;
     let finIndex = debut + event.pageSize;
     if(finIndex > this.cardsItems.length){
       finIndex = this.cardsItems.length;
     }
        this.pageSlice =   this.cardsItems.slice(debut,finIndex)

     }
  

  
  }