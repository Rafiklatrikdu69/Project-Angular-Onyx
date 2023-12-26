import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../modules/core-app-image/services/user.service';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-form-connexion',
  templateUrl: './form-connexion.component.html',
  styleUrl: './form-connexion.component.scss'
})
// export class DialogOverviewExample {
//   animal!: string;
//   name!: string;

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(FormConnexionComponent, {
//       data: {name: this.name, animal: this.animal},
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.animal = result;
//     });
//   }
// }
export class FormConnexionComponent {
  
  form:any={
    pseudo: null
  }
    constructor(private userService: UserService,private router:Router,private dialog:MatDialog) {
  
    
    
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
           
            //alert("desoler le pseudo que vous avez indiquer n'existe pas ! ")
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


