import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.scss'
})
export class InscriptionFormComponent {
  public userForm:FormGroup; // variable is created of type FormGroup is created
  first_name: string = ""; // Variable is created to show the input value below the button
  constructor( private fb: FormBuilder,private userService: UserService) {
    // Form element defined below
    this.userForm = this.fb.group({
      first_name: ''
    });
  }
  setValue() {
    this.first_name=this.userForm.get('first_name')?.value; // input value retrieved

  }
  ngOnInit() {
    this.userService.checkUserExists("Lukas").subscribe(data=>{
      console.log(data)
      if(data=="Existe pas !"){
        this.userService.insertTable().subscribe();
      }
    }
    
      //console.log(data) 
      );
    //this.userService.insertTable().subscribe();
    //this.userService.checkUserExists("Lukas").subscribe();
    
  }
}
