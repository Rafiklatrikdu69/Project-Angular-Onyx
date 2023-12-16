import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
    // this.userService.setSession().subscribe();
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
  
  

  // getSession(): void {
  //   this.userService.getSession().subscribe(response => {
  //     console.log('Valeur de session :', response);
  //   });
  // }
ngAfterContentInit(): void {
  //Called after ngOnInit when the component's or directive's content has been initialized.
  //Add 'implements AfterContentInit' to the class.


  
}
  ngOnInit() {
    
      //console.log(data) 
      
    //this.userService.insertTable().subscribe();
    //this.userService.checkUserExists("Lukas").subscribe();
    
  }
}
