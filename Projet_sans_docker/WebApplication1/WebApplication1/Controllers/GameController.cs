using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Relational;
using WebApplication1.classes;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly string _connectionString = "server=127.0.0.1;user=root;database=Onyx;password=";//connexion a la bd -> plus tard mise en place du singleton
        private MySqlConnection _myConnection;
        [HttpPost("partie")]

        public void insertDataPartie([FromBody] Game myObject)
        {
            _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            var pseudo = myObject.pseudo;
            var meilleurChrono = myObject.valMeilleurChrono;
            var moyenneChrono = myObject.valMoyenneChrono;
            var dateHeure = myObject.dateHeure;
            Console.WriteLine("partie pseudo " + pseudo);
            Console.WriteLine("La date  " + dateHeure);
            string sql = "INSERT INTO gameh (pseudo,valMeilleurChrono,valMoyenneChrono,dateHeure) VALUES(@pseudo,@valMChrono,@valMoyChrono,@date);";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
                command.Parameters.AddWithValue("@pseudo", pseudo);
                command.Parameters.AddWithValue("@valMChrono", meilleurChrono);
                command.Parameters.AddWithValue("@valMoyChrono", moyenneChrono);
                command.Parameters.AddWithValue("@date", dateHeure);
                command.ExecuteNonQuery();


            }

        }
        [HttpGet("getPartieByDate")]
        public async Task<ActionResult<List<ClickPartie>>> getPartieByDate()
        {
            List<ClickPartie> listGame = new List<ClickPartie>();
            _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            var idPartie = 0;
      
         
            // Console.WriteLine("La date de la partie : "+date);
            string sql = "SELECT * FROM gameh where dateHeure = (SELECT max(dateHeure) FROM gameh);";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
             
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        idPartie = Convert.ToInt32(reader["numPartie"]);
                        Console.WriteLine("le numero de la partie : " + idPartie); 
                    }
                }
            }

            string selectClick = "SELECT * FROM gamed WHERE @id=numPartie";
            using (MySqlCommand command = new MySqlCommand(selectClick, _myConnection))
            {
                command.Parameters.AddWithValue("@id", idPartie);
                command.ExecuteNonQuery();
                using (MySqlDataReader reader = command.ExecuteReader())
                {


                    while (reader.Read())
                    {
                        ClickPartie gameClick = new ClickPartie(Convert.ToInt32(reader["numPartie"]), reader["numClick"], reader["valClickChrono"]);
                        listGame.Add(gameClick);
                        Console.Write("taille de la liste : " + listGame.Count + "\n");
                        Console.WriteLine("Numero de partie : " + gameClick.numPartie + "\n");
                        Console.WriteLine("Numero du clique :  " + gameClick.numClick + "\n");
                        Console.Write("Valeur du clique : " + gameClick.valClickChrono + "\n");
                    }
                }



            }
            
            if (listGame.Count > 0)
            {
                for (int i = 0; i < listGame.Count; i++)
                    Console.WriteLine(listGame[i].toString());
                return listGame;
            }
            else
            {
                Console.WriteLine("la liste est vide !");
            }

            //return new List<ClickPartie>
            //{
            //    new ClickPartie
            //    {
            //        numPartie = 13,
            //        numClick = 8,
            //        valClickChrono = 600

            //    }
            //};
            return null;
            


        }
        [HttpPost("insertInfoclick")]

        public void insertInfoClicks([FromBody] ClickPartie[] click)
        {

            
           
                        _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            for (int i = 0;i< click.Length; i++)
            {
                Console.WriteLine("Info sur le clique :"+click[i].numPartie);
            }


            //string sql = "INSERT INTO gamed (numPartie,numClick,valClickchrono);";
            string sql = "SELECT * FROM gameh where dateHeure = (SELECT max(dateHeure) FROM gameh);";
            var idPartie = 0;
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        idPartie = Convert.ToInt32(reader["numPartie"]);
                    }
                }
            }
            string insertSql = "INSERT INTO gamed (numPartie,numClick,valClickchrono) VALUES(@numPartie,@numClick,@valClick)";
            for (int i = 0; i < click.Length; i++)
            {
                using (MySqlCommand command = new MySqlCommand(insertSql, _myConnection))
                {
                    command.Parameters.AddWithValue("@numPartie", idPartie);
                    command.Parameters.AddWithValue("@numClick", click[i].numClick);
                    command.Parameters.AddWithValue("@valClick", click[i].valClickChrono);
                    command.ExecuteNonQuery();


                }
            }
        }

       
    }
}
