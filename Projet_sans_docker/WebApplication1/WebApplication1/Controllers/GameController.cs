    using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
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
            Console.WriteLine("partie pseudo "+pseudo);
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
    }
}
