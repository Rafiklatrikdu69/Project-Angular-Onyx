using System.Data;
using MySql.Data.MySqlClient;

namespace WebApplication1.Models
{

    /// <author>
    /// Rafik BOUCHENNA
    /// </author>
    public class Singleton
    {
        private static Singleton instance = null;
        private MySqlConnection _myConnection;

       private Singleton()
        {
            Thread.Sleep(1000);
            string connection = "server=127.0.0.1;user=root;database=Onyx;password=";
            _myConnection = new MySqlConnection(connection);
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

        public MySqlConnection getBdd()
        {
            if (_myConnection.State == ConnectionState.Closed)
            {
                _myConnection.Open();
            }

            return _myConnection;
        }
    }
}
