export class Click{
    numPartie!:number
    numClick!:object
    valClickChrono!:object
    constructor(numPartie=0,numClick?:any,valClickChrono?:any){
        this.numPartie = numPartie;
        this.numClick = numClick;
        this.valClickChrono =valClickChrono;
    }
}