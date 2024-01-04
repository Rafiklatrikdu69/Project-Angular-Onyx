import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-connexion',
  templateUrl: './form-connexion.component.html',
  styleUrl: './form-connexion.component.scss'
})

export class FormConnexionComponent {
  
  form:any={
    pseudo: null
  }
  id!:any
    constructor(private userService: UserService,private router:Router,private dialog:MatDialog,private route: ActivatedRoute) {
    }
  ngOnInit(): void {
  
  }
 
  
  onSubmit() :void{

    if(this.form.pseudo!=undefined){
      console.log(this.form.pseudo);
        console.log("on va tester");

        this.userService.checkUserExists(this.form.pseudo).subscribe(data=>{
          console.log(data)
          if(data=="Existe pas !"){
           
            //alert("desoler le pseudo que vous avez indiquer n'existe pas ! ")
          }else{
            alert("Vous etes connectez !")
            this.id = this.route.snapshot.paramMap.get('id')
           // console.log(history.state['id'])
           if(this.id=='1'){
          alert()
            this.router.navigate(['/app-jeu']);
           }
            this.router.navigate(['/'+this.id]);
            this.userService.setSessionPseudo(this.form.pseudo).subscribe(data=>{

            });

          }
        }
          );
    }
  
  }
}


