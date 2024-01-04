import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

export class Sessions{
    session!:string;
    private OuvertureDialog!:any
    constructor(){
        
    }
    public getSession(){
        return this.session;
    }
    public   verifsession(data:string,router:Router,cheminErreur:string,cheminValide:string){
        
        
        if(data==="pas de session "){
            this.OuvertureDialog = false
            router.navigate([`/${cheminErreur}`,cheminValide])
        }else{
            this.OuvertureDialog = true;
            router.navigate(['/'+cheminValide])
        }
    }

    public getOuvertureDialog(){
        return this.OuvertureDialog;
    }
}