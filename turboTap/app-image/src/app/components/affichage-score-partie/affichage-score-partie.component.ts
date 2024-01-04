import { GameService } from '../../modules/core-app-image/services/game.service';
import { Click } from '../../modules/core-app-image/models/Click';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { GameJoueur } from '../../modules/core-app-image/models/GameJoueur';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Sessions } from '../../modules/core-app-image/models/Sessions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affichage-score-partie',
  templateUrl: './affichage-score-partie.component.html',
  styleUrls: ['./affichage-score-partie.component.scss'],
})
export class AffichageScorePartieComponent {
  clicks: Click[] = [];
  displayedColumns: string[] = ['numPartie', 'numClick', 'valClickChrono'];
  displayedColumnsParties: string[] = ['id', 'pseudo', 'valMeilleurChrono','valMoyenneChrono'];
  displayedColumnsAllParties: string[] = ['id', 'pseudo', 'valMeilleurChrono','valMoyenneChrono'];
  

  public pageSlice!: Click[];
  public pageSliceParties!:GameJoueur[];
  dataSource: any;
  clickMoyen: any;
  PartieJoueur: GameJoueur[]=[]
  dataSourceParties:any;

  dataSourceAllParties:any;

  @ViewChild(MatSort) sort!: MatSort;
  parties : GameJoueur[] = []
  constructor(private gameService: GameService, private userService: UserService,private _liveAnnouncer: LiveAnnouncer,private router:Router) {}
  

  clickedRows!:any
  session!:any
  lastPlayedIndex: number | null = null;
  ngOnInit(): void {   
    
    this.userService.getSessionPseudo().subscribe(data => {
      let session = new Sessions()
      session.verifsession(data,this.router,"app-authentification","affichage-score-partie")
      this.session = data
      this.click(data);
      setTimeout(() => {
        ( this.cMoyen(data))
      }, 100);
      setTimeout(() => {
        this.gameService.getPartiesJoueur(data).subscribe(data=>{
        this.PartieJoueur = data.sort(
              (p1, p2) => 
              (p1.valMoyenneChrono > p2.valMoyenneChrono) ? 1 : (p1.valMoyenneChrono < p2.valMoyenneChrono) ? -1 : 0);data.sort(
                (p1, p2) => 
                (p1.valMoyenneChrono > p2.valMoyenneChrono) ? 1 : (p1.valMoyenneChrono < p2.valMoyenneChrono) ? -1 : 0);;
          this.pageSliceParties = this.PartieJoueur.slice(0, this.PartieJoueur.length);
          
          this.dataSourceParties = new MatTableDataSource(this.pageSliceParties);
          this.dataSourceParties.sort = this.sort;
         
            if(this.sort==null){
              alert("cest nul")
            }

            
          })
          
        },500)
        setTimeout(()=>{
          this.gameService.getAllPartie().subscribe(data=>{
            this.parties = data.sort(
              (p1, p2) => 
              (p1.valMoyenneChrono > p2.valMoyenneChrono) ? 1 : (p1.valMoyenneChrono < p2.valMoyenneChrono) ? -1 : 0);

            this.dataSourceAllParties = new MatTableDataSource(this.parties.slice(0,this.parties.length))
            
          })  
        },200)
        
        
        
      });
    }
    async cMoyen (data: string){
      this.clickMoyen = (await this.gameService.getClickMoyen(data)).subscribe(data=>{
        this.clickMoyen = JSON.stringify(data);
      });
      
    }
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
    async click (data:string){
      (await this.gameService.getAllClick(data)).subscribe((result: Click[]) => {
        this.clicks = result;
        this.pageSlice = this.clicks.slice(0, 2);
        this.dataSource = this.pageSlice;
        for (let c of this.clicks) {
         
            this.lastPlayedIndex = c.numPartie
          }
        });
      }
     
      OnPageChange(event: PageEvent): void {
        const debut = event.pageIndex * event.pageSize;
        let finIndex = debut + event.pageSize;
        if (finIndex > this.clicks.length) {
          finIndex = this.clicks.length;
        }
        this.pageSlice = this.clicks.slice(debut, finIndex);
        this.dataSource = this.pageSlice;
      }
      
      OnPageChangePartie(event: PageEvent): void {
        const debut = event.pageIndex * event.pageSize;
        let finIndex = debut + event.pageSize;
        if (finIndex > this.PartieJoueur.length) {
          finIndex = this.PartieJoueur.length;
        }
        
        this.pageSliceParties = this.PartieJoueur.slice(debut, finIndex);
        this.dataSourceParties = this.pageSliceParties;
        this.dataSourceParties = new MatTableDataSource(this.pageSliceParties);
        this.dataSourceParties.sort = this.sort;
      }
      
    }

