



using MySql.Data.MySqlClient;

namespace WebApplication1.Models
{
    public class ConnexionBD 
    {
        private MySqlConnection myConnection;
        public void TestConnection()
        {
            string connection = "server=127.0.0.1;user=root;database=test;password=";
             myConnection = new MySqlConnection(connection);

            try
            {
                myConnection.Open();
                Console.WriteLine("Connection Reussi !");
                string createTableQuery = "CREATE TABLE IF NOT EXISTS MaTable ( " +
                                    "ID INT AUTO_INCREMENT PRIMARY KEY, " +
                                    "Nom VARCHAR(255) NOT NULL, " +
                                    "Age INT )";

                using (MySqlCommand command = new MySqlCommand(createTableQuery, myConnection))
                {
                    command.ExecuteNonQuery();
                    Console.WriteLine("Table créée avec succès !");
                }
            }
            catch(Exception ex)
            {
                myConnection.Close();
                Console.WriteLine(ex.Message);
            }
        }

        public MySqlConnection connexion()
        {
            return this.myConnection;
        }



    }
    }

