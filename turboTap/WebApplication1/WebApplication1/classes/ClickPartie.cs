namespace WebApplication1.classes
{

    /// <author>
    /// Rafik BOUCHENNA
    /// </author>
    public class ClickPartie
    {

        public ClickPartie(int? numPartie, object numClick, object valClickChrono)
        {
            this.numPartie = numPartie;
            this.numClick = numClick;
            this.valClickChrono = valClickChrono;
        }

        public int? numPartie { get; set; }
        public object numClick { get; set; }
        public object valClickChrono { get; set;}

        public string toString()
        {
            return numPartie +""+ numClick + valClickChrono; 
        }


       
    }
}
