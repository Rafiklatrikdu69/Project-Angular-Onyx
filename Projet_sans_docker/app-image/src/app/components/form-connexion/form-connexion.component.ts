import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-form-connexion',
  templateUrl: './form-connexion.component.html',
  styleUrl: './form-connexion.component.scss'
})
export class FormConnexionComponent {
  form:any={
    pseudo: null
  }
    constructor(private userService: UserService,private router:Router) {
  
    
    
    }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  
  onSubmit() :void{

    if(this.form.pseudo!=undefined){
      console.log(this.form.pseudo);
        console.log("on va tester");

        this.userService.checkUserExists(this.form.pseudo).subscribe(data=>{
          console.log(data)
          if(data=="Existe pas !"){
            alert("desoler le pseudo que vous avez indiquer n'existe pas ! ")
          }else{
            alert("Vous etes connectez !")
            this.router.navigate(['/app-jeu']);
            this.userService.setSessionPseudo(this.form.pseudo).subscribe(data=>{
              // console.log(data)
            });
         //   this.userService.getSessionPseudo().subscribe();
          }
        }
          );
    }
  
  }
}


