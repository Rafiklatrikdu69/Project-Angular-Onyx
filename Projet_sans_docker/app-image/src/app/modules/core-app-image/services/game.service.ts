import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Click } from '../models/Click';
import { GameJoueur } from '../models/GameJoueur';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  constructor(private http: HttpClient) { }
  url="https://localhost:7289/api/Game/";
  insertDataPartie(pseudo:string,valMeilleurChrono:any,valMoyenneChrono:any,dateHeure:string){
    const data ={numPartie:1,pseudo:pseudo,valMeilleurChrono:valMeilleurChrono,valMoyenneChrono:valMoyenneChrono,dateHeure:dateHeure}
    
    return  this.http.post("https://localhost:7289/api/Game/partie",data,{responseType:"text"})
  }
  
  public  async getAllClick(pseudo:string){
    const data = {id:"1",pseudo:pseudo}
    return this.http.post<Click[]>("https://localhost:7289/api/Game/getPartieByDate",data,{responseType:"json"})
  }
  
  public  insertInfoClick(clicks:Click[]){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
    const data = JSON.stringify(clicks);
    return this.http.post("https://localhost:7289/api/Game/insertInfoclick",data,httpOptions)
    
  }
  public async getClickMoyen(pseudo: string) {
    const data = { id: 1, pseudo: pseudo };
    console.log(data);
    return this.http.post("https://localhost:7289/api/Game/getValMoyenneClick", data, { responseType: "text" });
  }
  public getPartiesJoueur(pseudo:string){
    const data = {id:"1",pseudo:pseudo}
    return this.http.post<GameJoueur[]>("https://localhost:7289/api/Game/getPartiesJoueur",data,{ responseType: "json" })
  }

  public getAllPartie(){
    return this.http.get<GameJoueur[]>("https://localhost:7289/api/Game/getParties")
  }

}
