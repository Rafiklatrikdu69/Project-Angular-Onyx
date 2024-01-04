import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

export class Sessions{
    session!:string;
    constructor(){
        
    }
    public getSession(){
        return this.session;
    }
    public   verifsession(data:string,router:Router,cheminErreur:string,cheminValide:string){
        
        
        if(data==="pas de session "){
            router.navigate([`/${cheminErreur}`,cheminValide])
        }else{
            router.navigate(['/'+cheminValide])
        }
    }
}