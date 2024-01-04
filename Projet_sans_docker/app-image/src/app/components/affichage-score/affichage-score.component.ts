import { Component, ViewChild } from '@angular/core';
import { GameService } from '../../modules/core-app-image/services/game.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { GameJoueur } from '../../modules/core-app-image/models/GameJoueur';
import { MatSort, Sort } from '@angular/material/sort';
import { Click } from '../../modules/core-app-image/models/Click';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { Sessions } from '../../modules/core-app-image/models/Sessions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affichage-score',
  templateUrl: './affichage-score.component.html',
  styleUrl: './affichage-score.component.scss'
})
export class AffichageScoreComponent {
  displayedColumnsAllParties: string[] = ['numPartie','valMoyenneChrono','link'];
  
  public pageSlice!: GameJoueur[];
  
  dataSourceAllParties:any;
  
  @ViewChild(MatSort) sort!: MatSort;
  parties : GameJoueur[] = []
  nbPage!:number
  session!:any
  constructor(private gameService: GameService,private _liveAnnouncer: LiveAnnouncer,private userService:UserService,private router:Router) {}
  
  
  lastPlayedIndex: number | null = null;
  ngOnInit(): void {
    console.log("Début !");
    this.userService.getResultPage().subscribe(data=>{
      this.nbPage = Object.assign(data)
    })
    this.userService.getSessionPseudo().subscribe(data=>{
      console.log(data)
      let session = new Sessions()
      session.verifsession(data,this.router,"app-authentification","affichage-score")
      this.session = data
      setTimeout(()=>{
        this.gameService.getPartiesJoueur(this.session).subscribe(data=>{
          this.parties = data.sort(
            (p1, p2) => 
            (p1.valMoyenneChrono > p2.valMoyenneChrono) ? 1 : (p1.valMoyenneChrono < p2.valMoyenneChrono) ? -1 : 0);
            console.log("parties : "+JSON.stringify(data))
            this.pageSlice = this.parties.slice(0,this.nbPage);
            this.dataSourceAllParties = new MatTableDataSource(this.pageSlice)
            console.log();
          })
        },200)
    });
   
      
     
      
      
    }
    
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
    
    
    OnPageChange(event: PageEvent): void {
      console.log(event);
      const debut = event.pageIndex * event.pageSize;
      let finIndex = debut + event.pageSize;
      if (finIndex > this.parties.length) {
        finIndex = this.parties.length;
      }
      this.pageSlice = this.parties.slice(debut, finIndex);
      this.dataSourceAllParties = this.pageSlice;
    }
    
    
  }
