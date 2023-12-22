import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Click } from '../models/Click';

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

   public getAllClick():Observable<Click[]>{

      return this.http.get<Click[]>("https://localhost:7289/api/Game/getPartieByDate",{
        headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'localhost:5000',
           'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
           'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type'
         })
       })
   }
   public insertInfoClick(clicks:Click[]){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const data = JSON.stringify(clicks);
      return this.http.post("https://localhost:7289/api/Game/insertInfoclick",data,httpOptions)

   }
}
