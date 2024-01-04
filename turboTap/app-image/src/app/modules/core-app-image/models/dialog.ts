import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

export class dialog{
    private dialog!:MatDialog
    constructor(dialog:any){
       this.dialog = dialog
    }

   public openDialog(composant:any){
         this.dialog.open(composant, {
            width:'300px',
            height:'auto',
            data: 'right click'
        })
    }
}