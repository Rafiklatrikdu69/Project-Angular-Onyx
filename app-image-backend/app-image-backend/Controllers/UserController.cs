    using System;
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using MySql.Data.MySqlClient;
    using app_image_backend.Models;

    namespace app_image_backend.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class UserController : ControllerBase
        {
            private MySqlConnection myConnection;
            [HttpGet]
            public async Task<ActionResult<List<User>>> getUsers()
            {
                return new List<User>
                {
                    new User
                    {
                        ID = 12,
                        Name = "Rafik",
                        Email = "raffraff721@gmail.com"
                    },
                    new User
                    {
                        ID = 13,
                        Name = "Ramazan",
                        Email = "ramazan12@gmail.com"
                    }
                };
            }

            [HttpGet("insert")]
            public void createUser()
            {
                string connection = "server=mysql_db;user=root;database=Sportify;password=root";
                myConnection = new MySqlConnection(connection);
                myConnection.Open();

                string sql = "INSERT INTO `matable` (Nom, Age) VALUES ('Rafik', 124);";
                using (MySqlCommand command = new MySqlCommand(sql, myConnection))
                {
                    command.ExecuteNonQuery();
                    Console.WriteLine("Table créée avec succès !");
                }
            }

            [HttpPost("userSelect")]
            public String verifyUtilisateur([FromBody] User myObject)
            {
            string connection = "server=mysql_db;user=myuser;database=Onyx;password=mypassword";

            myConnection = new MySqlConnection(connection);
            try
            {
                // Code de connexion MySQL
                myConnection.Open();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur de connexion MySQL : {ex.Message}");
            }
            var id = myObject.ID;
                var name = myObject.Name;
                var email = myObject.Email;

                string sql = "SELECT Nom from  matable WHERE Nom=@nom;";
                MySqlCommand command = new MySqlCommand(sql, myConnection);
                command.Parameters.AddWithValue("@nom", name);

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        Console.WriteLine("l'utilisateur est deja present !");
                        Console.WriteLine(String.Format("{0}", reader["Nom"]));
                        return "existe";
                    }
               
                    return "Existe pas !";
                }
            }


            [HttpPost("userInsert")]
            public void test([FromBody] User myObject)
            {
            // Ajoutez une pause (par exemple, 10 secondes) avant de tenter la connexion MySQL
            System.Threading.Thread.Sleep(10000);

            // Ensuite, tentez de vous connecter à la base de données MySQL

            string connection = "server=mysql_db;user=myuser;database=Onyx;password=mypassword";

            myConnection = new MySqlConnection(connection);
            try
            {
                // Code de connexion MySQL
                myConnection.Open();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur de connexion MySQL : {ex.Message}");
            }

            //string createTableQuery = "CREATE TABLE IF NOT EXISTS matable ( " +
            //                      "ID INT AUTO_INCREMENT PRIMARY KEY, " +
            //                      "Nom VARCHAR(255) NOT NULL, " +
            //                      "Age INT )";

            //using (MySqlCommand command = new MySqlCommand(createTableQuery, myConnection))
            //{
            //    command.ExecuteNonQuery();
            //    Console.WriteLine("Table créée avec succès !");
            //}
            var id = myObject.ID;
                var name = myObject.Name;
                var email = myObject.Email;
                string sql = "INSERT INTO matable (Nom,Age) VALUES (@nom,@email);";
                using (MySqlCommand command = new MySqlCommand(sql, myConnection))
                {
                    //command.Parameters.AddWithValue("@id",3);
                    command.Parameters.AddWithValue("@nom", "fjs");
                    command.Parameters.AddWithValue("@email", "12");

                    command.ExecuteNonQuery();
                    Console.WriteLine("Table créée avec succès !");
                }
            }

        }
    }
