import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../modules/core-app-image/services/user.service';

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
  constructor(private userService: UserService) {
    
    
    
  }
  
  onSubmit() :void{

    if(this.form.pseudo!=undefined){
      
      this.userService.checkUserExists(this.form.pseudo).subscribe(data=>{
        console.log(data)
        if(data=="Existe pas !"){
          
          this.userService.insertTable(this.form.pseudo).subscribe();
        }else{     
          alert("Ce pseudo est deja utiliser !");
          
        }
      }
      );
    }
    
  }
}
