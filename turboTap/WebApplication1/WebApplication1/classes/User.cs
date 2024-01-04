namespace WebApplication1.classes
{
    public class User
    {

        /// <author>
        /// Rafik BOUCHENNA
        /// </author>

        public int ID { set; get; }
        public string pseudo { set; get; }
        public User(int id ,string pseudo)
        {
            this.ID = id;
           this.pseudo = pseudo;
        }
    }
}
