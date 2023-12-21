using MySql.Data.MySqlClient;

namespace WebApplication1.Models
{
    public class Singleton
    {
        private static Singleton instance = null;
        Singleton() { 
            string connection = "server=127.0.0.1;user=root;database=Onyx;password=";
            MySqlConnection _myConnection = new MySqlConnection(connection);
        }

        public static Singleton Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Singleton();
                }
                return instance;
            }
        }
    }
}
