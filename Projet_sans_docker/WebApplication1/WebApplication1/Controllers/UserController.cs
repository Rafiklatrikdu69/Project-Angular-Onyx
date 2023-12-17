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
using System.Net.Http;
namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private static ISession _sharedSession;
        private readonly string _connectionString = "server=127.0.0.1;user=root;database=Onyx;password=";
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
                    pseudo = "Rafik",
                  
                },
                new User
                {
                    ID = 13,
                    pseudo = "Ramazan",
                   
                }
            };
        }

        [HttpGet("insert")]
        public void CreateUser()
        {
            _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            string sql = "INSERT INTO `utilisateur` (pseudo) VALUES ('Rafik');";
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
            var name = myObject.pseudo;

            string sql = "SELECT pseudo from utilisateur WHERE pseudo=@pseudo;";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
                command.Parameters.AddWithValue("@pseudo", name);
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        Console.WriteLine("l'utilisateur est déjà présent !");
                        Console.WriteLine(String.Format("{0}", reader["pseudo"]));
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
            var name = myObject.pseudo;
           // var email = myObject.Email;

            string sql = "INSERT INTO utilisateur (pseudo) VALUES (@pseudo);";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
                command.Parameters.AddWithValue("@pseudo", name);
              //  command.Parameters.AddWithValue("@email", email);
                command.ExecuteNonQuery();
                Console.WriteLine("Table créée avec succès !");
            }
        }

        [HttpPost("session")]
        public void SetSessionValue([FromBody] User myObject)
        {
            var httpContext = HttpContext;
            var pseudo = myObject.pseudo;
            
                _sharedSession = httpContext.Session;
                _sharedSession.SetString("pseudo", pseudo);
       
            

          
        }
        [HttpDelete("deconnexion")]
        public void deconnexion()
        {
            var httpContext = HttpContext;
            _sharedSession = httpContext.Session;
            _sharedSession.Remove("pseudo");

        }
        [HttpGet("test-session")]
        public string GetSessionValue()
        {
            if (_sharedSession != null)
            {
                Console.WriteLine("La session : " + _sharedSession.GetString("pseudo"));
            }

            return _sharedSession?.GetString("pseudo") ?? "pas de session !";
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
