import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../modules/User';

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
    public insertTable(){
      const myData = { id: '1', name: 'Lukas' ,email:"12"};
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
  
}
