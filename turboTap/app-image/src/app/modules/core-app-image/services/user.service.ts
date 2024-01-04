import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/User';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "https://localhost:7289/api/User";

  constructor(private http: HttpClient) { 
    
  }

 
    public insertTable(pseudo:string){
      const myData = { id: '1', pseudo: pseudo};
    return  this.http.post(this.url+"/userInsert", myData);
   }



  public checkUserExists(pseudo:string) {
    
    const myData = { id: '1', pseudo: pseudo };
    return  this.http.post(this.url+"/userSelect", myData,{responseType: 'text'});
  }
  public getNbClick(){
    return this.http.get(this.url+"/json");
  }
  public getResultPage(){
    return this.http.get(this.url+"/json-page");
  }
  setSessionPseudo(pseudo: string) {
    const myData = { id: "1", pseudo: pseudo };
    return this.http.post(this.url+"/session", myData,{withCredentials:true} );
  }
  getSessionPseudo() {
    return this.http.get(this.url+'/test-session',{ withCredentials: true, responseType: 'text' });
  }
  public deconnexion(){
    return this.http.delete(this.url+'/deconnexion',{ withCredentials: true});
  }

}
