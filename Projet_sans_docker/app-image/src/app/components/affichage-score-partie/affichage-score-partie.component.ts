import { GameService } from '../../modules/core-app-image/services/game.service';
import { Click } from '../../modules/core-app-image/models/Click';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { GameJoueur } from '../../modules/core-app-image/models/GameJoueur';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-affichage-score-partie',
  templateUrl: './affichage-score-partie.component.html',
  styleUrls: ['./affichage-score-partie.component.scss'],
})
export class AffichageScorePartieComponent {
  clicks: Click[] = [];
  displayedColumns: string[] = ['numPartie', 'numClick', 'valClickChrono'];
  displayedColumnsParties: string[] = ['numPartie', 'pseudo', 'valMeilleurChrono','valMoyenneChrono'];
  displayedColumnsAllParties: string[] = ['numPartie', 'pseudo', 'valMeilleurChrono','valMoyenneChrono'];
  

  public pageSlice!: Click[];
  public pageSliceParties!:GameJoueur[];
  dataSource: any;
  clickMoyen: any;
  PartieJoueur: GameJoueur[]=[]
  dataSourceParties:any;

  dataSourceAllParties:any;

  @ViewChild(MatSort) sort!: MatSort;
  parties : GameJoueur[] = []
  constructor(private gameService: GameService, private userService: UserService,private _liveAnnouncer: LiveAnnouncer) {}
  

  clickedRows!:any
  lastPlayedIndex: number | null = null;
  ngOnInit(): void {
    console.log("Début !");
    this.userService.getSessionPseudo().subscribe(data => {
      this.click(data);
      setTimeout(() => {
        ( this.cMoyen(data))
      }, 100);
      setTimeout(() => {
        this.gameService.getPartiesJoueur(data).subscribe(data=>{
          console.log("info partie"+data);

          this.PartieJoueur = data.sort(
              (p1, p2) => 
              (p1.valMoyenneChrono > p2.valMoyenneChrono) ? 1 : (p1.valMoyenneChrono < p2.valMoyenneChrono) ? -1 : 0);data.sort(
                (p1, p2) => 
                (p1.valMoyenneChrono > p2.valMoyenneChrono) ? 1 : (p1.valMoyenneChrono < p2.valMoyenneChrono) ? -1 : 0);;
          this.pageSliceParties = this.PartieJoueur.slice(0, 5);
          
          this.dataSourceParties = new MatTableDataSource(this.pageSliceParties);
          this.dataSourceParties.sort = this.sort;
          
          

          console.log("MatSort:", this.sort); 
          for (let g of this.PartieJoueur) {
            console.log(
              "Numéro de la partie :" + g.numPartie + " pseudo de la partie :" + g.pseudo + " Valeur du  meilleur chrono :" + g.valMeilleurChrono+ " valeur moyenne du chrono"+g.valMoyenneChrono
              );
            }
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
            console.log("parties : "+JSON.stringify(data))
            this.dataSourceAllParties = new MatTableDataSource(this.parties.slice(0,this.parties.length))
            console.log();
          })
        },200)
        
        
        
      });
    }
    async cMoyen (data: string){
      console.log("data : "+data);
      this.clickMoyen = (await this.gameService.getClickMoyen(data)).subscribe(data=>{
        this.clickMoyen = data;
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
          console.log(
            "Numéro du clic :" + c.numClick + " Numéro de la partie :" + c.numPartie + " Valeur du chrono :" + c.valClickChrono
            );
            this.lastPlayedIndex = c.numPartie
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
      
      OnPageChangePartie(event: PageEvent): void {
        console.log(event);
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

