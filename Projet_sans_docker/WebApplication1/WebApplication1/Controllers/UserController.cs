using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MySql.Data.MySqlClient;
using WebApplication1.Models;
using System.Text.Json;
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Runtime.InteropServices;
using System.Security.Claims;
namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private static ISession _sharedSession;
        private readonly string _connectionString = "server=127.0.0.1;user=root;database=test;password=";
        private MySqlConnection _myConnection;

        public UserController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return new List<User>
            {
                new User
                {
                    ID = 1223213,
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
        public void CreateUser()
        {
            _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            string sql = "INSERT INTO `matable` (Nom, Age) VALUES ('Rafik', 124);";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
                command.ExecuteNonQuery();
                Console.WriteLine("Table créée avec succès !");
            }
        }

        [HttpPost("userSelect")]
        public string VerifyUtilisateur([FromBody] User myObject)
        {
            _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            var name = myObject.Name;

            string sql = "SELECT Nom from matable WHERE Nom=@nom;";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
                command.Parameters.AddWithValue("@nom", name);
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        Console.WriteLine("l'utilisateur est déjà présent !");
                        Console.WriteLine(String.Format("{0}", reader["Nom"]));
                        return "existe";
                    }
                }

                return "Existe pas !";
            }
        }

        [HttpPost("userInsert")]
        public void InsertUser([FromBody] User myObject)
        {
            _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            var name = myObject.Name;
            var email = myObject.Email;

            string sql = "INSERT INTO matable (Nom, Age) VALUES (@nom, @email);";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
                command.Parameters.AddWithValue("@nom", name);
                command.Parameters.AddWithValue("@email", email);
                command.ExecuteNonQuery();
                Console.WriteLine("Table créée avec succès !");
            }
        }

        [HttpPost("session")]
        public void SetSessionValue([FromBody] User myObject)
        {
            var httpContext = HttpContext;
            var pseudo = myObject.Name;
            if (_sharedSession == null)
            {
                _sharedSession = httpContext.Session;
                _sharedSession.SetString("userLoggedIn", pseudo);
       
            }

          
        }
        [HttpPost("deconnexion")]
        public void deconnexion()
        {
            _sharedSession.Remove("pseudo");

        }
        [HttpGet("test-session")]
        public string GetSessionValue()
        {
            if (_sharedSession != null)
            {
                Console.WriteLine("La session : " + _sharedSession.GetString("userLoggedIn"));
            }

            return _sharedSession?.GetString("userLoggedIn") ?? "pas de session !";
        }

        [HttpGet("json")]
        public int lectureFichier()
        {
            Console.WriteLine("Lecture du fichier : ");
            using (StreamReader r = new StreamReader("C:\\Users\\Rafik\\Documents\\Project-Angular-Onyx\\Projet_sans_docker\\WebApplication1\\WebApplication1\\data.json"))
            {
                string json = r.ReadToEnd();
                var data= JsonSerializer.Deserialize<DataJson>(json);
                Console.WriteLine(data.nbClick);
                return data.nbClick;
            }

        }
    }
}
