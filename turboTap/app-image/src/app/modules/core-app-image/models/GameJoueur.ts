        export class GameJoueur{
            numPartie?:number
            pseudo?:string
            valMeilleurChrono?:any
            valMoyenneChrono?:any
            dateHeure?:string
            constructor(num?:number,pseudo?:string,valMeilleurChrono?:any,valMoyenneChrono?:any,dateHeure?:string){
                this.numPartie = num
                this.pseudo= pseudo
                this.valMeilleurChrono = valMeilleurChrono
                this.valMoyenneChrono = valMoyenneChrono
                this.dateHeure = dateHeure
            }
            
        }