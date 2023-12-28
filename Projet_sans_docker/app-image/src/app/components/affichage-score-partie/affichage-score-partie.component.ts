import { Component } from '@angular/core';
import { GameService } from '../../modules/core-app-image/services/game.service';
import { Click } from '../../modules/core-app-image/models/Click';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../modules/core-app-image/services/user.service';

@Component({
  selector: 'app-affichage-score-partie',
  templateUrl: './affichage-score-partie.component.html',
  styleUrls: ['./affichage-score-partie.component.scss'],
})
export class AffichageScorePartieComponent {
  
  clicks: Click[] = [];
  displayedColumns: string[] = ['numPartie', 'numClick', 'valClickChrono'];
  public pageSlice!: Click[];
  dataSource: any;
  clickMoyen: any;
  
  constructor(private gameService: GameService, private userService: UserService) {}
  
  ngOnInit(): void {
    console.log("Début !");
    this.userService.getSessionPseudo().subscribe(data => {
      this.click(data);
      setTimeout(() => {
        ( this.cMoyen(data))
      }, 100);
      
    });
  }
  async cMoyen (data: string){
    console.log("data : "+data);
    this.clickMoyen = (await this.gameService.getClickMoyen(data)).subscribe(data=>{
      this.clickMoyen = data;
    });
    
  }
  async click (data:string){
    (await this.gameService.getAllClick(data)).subscribe((result: Click[]) => {
      this.clicks = result;
      this.pageSlice = this.clicks.slice(0, 2);
      this.dataSource = this.pageSlice;
      for (let c of this.clicks) {
        console.log(
          "Numéro du clic :" + c.numClick + " Numéro de la partie :" + c.numPartie + " Valeur du chrono :" + c.valClickChrono
          );
        }
        
      });
    }
    OnPageChange(event: PageEvent): void {
      console.log(event);
      const debut = event.pageIndex * event.pageSize;
      let finIndex = debut + event.pageSize;
      if (finIndex > this.clicks.length) {
        finIndex = this.clicks.length;
      }
      this.pageSlice = this.clicks.slice(debut, finIndex);
      this.dataSource = this.pageSlice;
    }
  }
