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
   
        private static ISession sessionStatic;//declaration de la session en static 
        private readonly string _connectionString = "server=127.0.0.1;user=root;database=Onyx;password=";//connexion a la bd -> plus tard mise en place du singleton
        private MySqlConnection _myConnection;

       

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
        /// <summary>
        /// Cette methode selectionne l'utilisateur dans la BD 
        /// </summary>
        /// <param name="myObject"></param>
        /// <returns></returns>
        [HttpPost("userSelect")]
        public string VerifyUtilisateur([FromBody] User myObject)
        {
            _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            var pseudo = myObject.pseudo;

            string sql = "SELECT pseudo from utilisateur WHERE pseudo=@pseudo;";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
                command.Parameters.AddWithValue("@pseudo", pseudo);
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
        /// <summary>
        /// Cette methode insert l'utilisateur dans la bd 
        /// </summary>
        /// <param name="myObject"></param>
        [HttpPost("userInsert")]
        public void InsertUser([FromBody] User myObject)
        {
            _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            var pseudo = myObject.pseudo;
          
            string sql = "INSERT INTO utilisateur (pseudo) VALUES (@pseudo);";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
                command.Parameters.AddWithValue("@pseudo", pseudo);
          
                command.ExecuteNonQuery();
                Console.WriteLine("Table créée avec succès !");
            }
        }

        /// <summary>
        /// Cette methode initialise la session 
        /// </summary>
        /// <param name="myObject"></param>
        [HttpPost("session")]
        public void SetSessionValue([FromBody] User myObject)
        {
            var httpContext = HttpContext;
            var pseudo = myObject.pseudo;

            sessionStatic = httpContext.Session;
            sessionStatic.SetString("pseudo", pseudo);
       
            

          
        }
        /// <summary>
        /// Cette methode detruit la session pour la deconnexion
        /// </summary>
        [HttpDelete("deconnexion")]
        public void deconnexion()
        {
            var httpContext = HttpContext;
            sessionStatic = httpContext.Session;
            sessionStatic.Remove("pseudo");

        }
        /// <summary>
        /// Cette methode permet de recuperer la session actuel afin de verifier si l'utilisteur 
        /// est bien connecter 
        /// </summary>
        /// <returns></returns>
        [HttpGet("test-session")]
        public string GetSessionValue()
        {
            if (sessionStatic != null)
            {
                Console.WriteLine("La session : " + sessionStatic.GetString("pseudo"));
            }

            return sessionStatic?.GetString("pseudo") ?? "pas de session !";
        }
        /// <summary>
        /// Cette methode permet de  lire le fichier Json et le traduit sous forme de 
        /// chaine de caractere ou de integer suivant le type de la classe DataJson
        /// </summary>
        /// <returns></returns>
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
