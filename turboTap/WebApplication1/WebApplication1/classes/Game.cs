    namespace WebApplication1.classes
    {

    /// <author>
    /// Rafik BOUCHENNA
    /// </author>
    public class Game
        {
        public Game(int? numPartie, string pseudo, object valMeilleurChrono, object valMoyenneChrono, string dateHeure)
        {
            this.numPartie = numPartie;
            this.pseudo = pseudo;
            this.valMeilleurChrono = valMeilleurChrono;
            this.valMoyenneChrono = valMoyenneChrono;
            this.dateHeure = dateHeure;
        }

        public int? numPartie { get; set; }
        public string pseudo { get; set; }
        public object valMeilleurChrono { get; set; }
        public object valMoyenneChrono { get; set; }
        public string  dateHeure { get; set; }
    }
    }
