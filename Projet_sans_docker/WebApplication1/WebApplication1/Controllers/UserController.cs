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
using WebApplication1.classes;
namespace WebApplication1.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
   
        private  ISession sessionStatic;//declaration de la session en static
        private readonly IHttpContextAccessor httpContextAccessor;
        private UserDAO user;


     public   UserController(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.user = new UserDAO();
        }
     

       
        /// <summary>
        /// Cette methode selectionne l'utilisateur dans la BD   
        /// </summary>
        /// <param name="myObject"></param>
        /// <returns></returns>
        [HttpPost("userSelect")]
        public string VerifyUtilisateur([FromBody] User myObject)
        {
            var pseudo = myObject.pseudo;
           
            var dictionary = new Dictionary<string, object>();//pour passer en parametre les arguments 
            dictionary.Add("nom", pseudo);
            var select = user.SelectUser(dictionary);
            if (select != null)
            {
                Console.WriteLine("Le user est present dans la bd ");
                Console.WriteLine("L'id " + select.ID);
                Console.WriteLine("Le pseudo " + select.pseudo);
                return "existe";
              
            }
            else
            {

                Console.WriteLine("quoicoubeh il est pas la ouuuuuu I");
               

            }
            return "Existe pas !";
      

           
        }
        /// <summary>
        /// Cette methode insert l'utilisateur dans la bd 
        /// </summary>
        /// <param name="myObject"></param>
        [HttpPost("userInsert")]
        public void InsertUser([FromBody] User myObject)
        {
            var pseudo = myObject.pseudo;
            var dictionnaire = new Dictionary<string, object>();//pour passer en parametre les arguments 
            dictionnaire.Add("pseudo", pseudo);
            this.user.InsertUser(dictionnaire);

        }

        /// <summary>
        /// Cette methode initialise la session 
        /// </summary>
        /// <param name="myObject"></param>
        [HttpPost("session")]
        public void SetSessionValue([FromBody] User myObject)
        {
            var httpContext = httpContextAccessor.HttpContext;
            Console.WriteLine("le pseudo : " + myObject.pseudo);

            if (httpContext != null)
            {
                var pseudo = myObject.pseudo;
                httpContext.Session.SetString("pseudo", myObject.pseudo);
            }
            else
            {
                // Gérer le cas où HttpContext est null, si nécessaire.
                Console.WriteLine("HttpContext est null.");
            }
        }

        [HttpDelete("deconnexion")]
        public void Deconnexion()
        {
            var httpContext = httpContextAccessor.HttpContext;
            httpContext.Session.Remove("pseudo");
            Console.WriteLine("Session supprimer");
        }

        [HttpGet("test-session")]
        public string GetSessionValue()
        {
            var httpContext = httpContextAccessor.HttpContext;

            if (httpContext.Session.GetString("pseudo") == null)
            {
                Console.WriteLine("La session est null");
            }
            else
            {
                Console.WriteLine(httpContext.Session.GetString("pseudo"));
                Console.WriteLine("La session est pas null");
                return httpContext.Session.GetString("pseudo")+"";
            }
            //httpContext.Session.SetString("pseudo", "Rafik");
            return "pas de session ";
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

        [HttpGet("json-page")]
        public int pagination()
        {
            Console.WriteLine("Lecture du fichier : ");
            using (StreamReader r = new StreamReader("C:\\Users\\Rafik\\Documents\\Project-Angular-Onyx\\Projet_sans_docker\\WebApplication1\\WebApplication1\\data.json"))
            {
                string json = r.ReadToEnd();
                var data = JsonSerializer.Deserialize<DataJson>(json);
                Console.WriteLine(data.nbResultats);
                return data.nbResultats;
            }

        }
    }
}
