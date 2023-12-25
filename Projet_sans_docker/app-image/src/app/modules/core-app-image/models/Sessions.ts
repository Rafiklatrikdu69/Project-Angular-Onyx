import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

export class Sessions{
    session!:string;
    constructor(){
        
    }
    public getSession(){
        return this.session;
    }
    public   verifsession(data:string,router:Router){

    
            if(data==="pas de session !"){
                
                alert("il ya pas de session !")
                router.navigate(['/app-form-connexion'])
            }else{
                 
            }
            
        }
}