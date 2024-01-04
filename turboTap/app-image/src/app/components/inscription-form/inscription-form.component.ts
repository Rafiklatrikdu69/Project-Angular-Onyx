import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { dialog } from '../../modules/core-app-image/models/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorInscriptionComponent } from '../dialog-error-inscription/dialog-error-inscription.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.scss'
})
export class InscriptionFormComponent {
  
  userForm : any ={
    pseudo: null
  }; 
  form:any={
    pseudo: null
  }
  constructor(private userService: UserService,private dialog:MatDialog,private router:Router) {}
  
  onSubmit() :void{

    if(this.form.pseudo!=undefined){
      this.userService.checkUserExists(this.form.pseudo).subscribe(data=>{
        console.log(data)
        if(data=="Existe pas !"){
          this.userService.insertTable(this.form.pseudo).subscribe();
            window.location.reload()
        }else{     
          let dia = new dialog(this.dialog)
          dia.openDialog(DialogErrorInscriptionComponent)
        }
      }
      );
    }
  }
}
