import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { dialog } from '../../modules/core-app-image/models/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog,MatDialogTitle,MatDialogContent } from '@angular/material/dialog';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';

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
  ngOnInit(): void {}
 
  
  onSubmit() :void{

    if(this.form.pseudo!=undefined){
      setTimeout(()=>{
        this.userService.checkUserExists(this.form.pseudo).subscribe(data=>{
          if(data=="Existe pas !"){
           let dia = new dialog(this.dialog)
           dia.openDialog(DialogErrorComponent)
          }else{
            this.id = this.route.snapshot.paramMap.get('id')
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
        })
    }
 
  
  }
}


