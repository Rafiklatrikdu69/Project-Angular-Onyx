import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../modules/User';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User";

  constructor(private http: HttpClient) { 

  }
  public createTable(){
    return this.http.get('https://localhost:7289/api/Test');
  }
    public insertTable(pseudo:string){
      const myData = { id: '1', pseudo: pseudo};
    return  this.http.post("https://localhost:7289/api/User/userInsert", myData);
   }
  public getUser(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7289/api/User',{
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': 'localhost:5000',
         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
         'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type'
       })
     })
  }

  public checkUserExists(pseudo:string) {

    const myData = { id: '1', pseudo: pseudo };
    return  this.http.post("https://localhost:7289/api/User/userSelect", myData,{responseType: 'text'});
}
  public getNbClick(){
    return this.http.get("https://localhost:7289/api/User/json");
  }
//  getSession(): Observable<string> {
//   return this.http.post<string>('https://localhost:7289/api/User/get-session-pseudo', { responseType: 'text' })
//   .pipe(
//     map(response => response), // Utilisez map pour traiter la réponse
//     catchError(error => {
//       console.error('Error getting session:', error);
//       return throwError(error);
//     })
//   );
// }

setSessionPseudo(pseudo:string) {
  const myData = { id: '1', pseudo: pseudo};
  return this.http.post("https://localhost:7289/api/User/session", myData);
}

getSessionPseudo() {
  return this.http.get('https://localhost:7289/api/User/test-session',{responseType: 'text'});
}
public deconnexion(){
  return this.http.delete('https://localhost:7289/api/User/deconnexion');
}



}
