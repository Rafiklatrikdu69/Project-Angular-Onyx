import { Component } from '@angular/core';
import { GameService } from '../../modules/core-app-image/services/game.service';
import { Click } from '../../modules/core-app-image/models/Click';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-affichage-click-detail',
  templateUrl: './affichage-click-detail.component.html',
  styleUrl: './affichage-click-detail.component.scss'
})
export class AffichageClickDetailComponent {
  constructor(private gameService:GameService){}
  displayedColumns: string[] = ['numPartie', 'numClick', 'valClickChrono'];
  public pageSlice!: Click[];
  dataSource: any;
  clicks: Click[] = [];

ngOnInit(): void {

  let c = new Click(history.state['id'],12,12);
 
    this.gameService.getAllClickPartie(c).subscribe((data:Click[])=>{
      this.clicks = data
      this.pageSlice = this.clicks.slice(0, 2);
      this.dataSource = this.pageSlice;
    })
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
