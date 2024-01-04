import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Click } from '../models/Click';
import { GameJoueur } from '../models/GameJoueur';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  constructor(private http: HttpClient) { }
  private url="https://localhost:7289/api/Game";
  insertDataPartie(pseudo:string,valMeilleurChrono:any,valMoyenneChrono:any,dateHeure:string){
    let partie = new GameJoueur(1,pseudo,valMeilleurChrono,valMoyenneChrono,dateHeure)
    const data =JSON.stringify(partie)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return  this.http.post(this.url+"/partie",data,httpOptions)
  }
  
  public  async getAllClick(pseudo:string){
    let user = new User(1,pseudo)
    const data = JSON.stringify(user);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Click[]>(this.url+"/getPartieByDate",data,httpOptions)
  }
  
  public  insertInfoClick(clicks:Click[]){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
    const data = JSON.stringify(clicks);
    return this.http.post(this.url+"/insertInfoclick",data,httpOptions)
    
  }
  public async getClickMoyen(pseudo: string) {
    let user = new User(1,pseudo)
    const data = JSON.stringify(user);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.url+"/getValMoyenneClick", data, httpOptions);
  }
  public getPartiesJoueur(pseudo:string){
    let user = new User(1,pseudo)
    const data = JSON.stringify(user);
  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<GameJoueur[]>(this.url+"/getPartiesJoueur",data,httpOptions)
  }
  
  public getAllPartie(){
    return this.http.get<GameJoueur[]>(this.url+"/getParties")
  }
  public getAllClickPartie(click:Click){
    const data = JSON.stringify(click)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Click[]>(this.url+"/allClickPartie",data,httpOptions)
      
  }
}
