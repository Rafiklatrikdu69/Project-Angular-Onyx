import { Component } from '@angular/core';
import { GameService } from '../../modules/core-app-image/services/game.service';
import { Click } from '../../modules/core-app-image/models/Click';

@Component({
  selector: 'app-affichage-score-partie',
  templateUrl: './affichage-score-partie.component.html',
  styleUrl: './affichage-score-partie.component.scss'
})
export class AffichageScorePartieComponent {
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
  }
