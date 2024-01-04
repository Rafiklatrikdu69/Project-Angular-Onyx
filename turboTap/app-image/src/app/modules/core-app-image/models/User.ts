import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

export class User{
    
    
    id?:number;
    pseudo="";
    
    constructor( id?:number,pseudo=""){
        this.id = id;
        this.pseudo = pseudo
    }
}