using System.Collections;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Relational;
using WebApplication1.classes;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly string _connectionString = "server=127.0.0.1;user=root;database=Onyx;password=";//connexion a la bd -> plus tard mise en place du singleton
        private MySqlConnection _myConnection;
        private GameDAO _gameDAO;
        public static string _pseudo;
       public GameController()
        {
            this._gameDAO = new GameDAO();
        }
        [HttpPost("partie")]

        public void insertDataPartie([FromBody] Game myObject)
        {
            var pseudo = myObject.pseudo;
            var meilleurChrono = myObject.valMeilleurChrono;
            var moyenneChrono = myObject.valMoyenneChrono;
            var dateHeure = myObject.dateHeure;
            var dictionnaire = new Dictionary<string, object>();//pour passer en parametre les arguments 
            dictionnaire.Add("pseudo", pseudo);
            dictionnaire.Add("valMChrono", meilleurChrono);
            dictionnaire.Add("valMoyChrono", moyenneChrono);
            dictionnaire.Add("date", dateHeure);
            this._gameDAO.insertPartie(dictionnaire);

         

        }
        [HttpPost("getPartieByDate")]
        public List<ClickPartie> getPartieByDate([FromBody] User pseudo)
        {
       
            var dictionnaire = new Dictionary<string, object>();//pour passer en parametre les arguments 
            dictionnaire.Add("pseudo", pseudo.pseudo);
            List<ClickPartie> listGame =  this._gameDAO.getAllClicks(dictionnaire);
           

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

          
            return null;



        }
        [HttpPost("insertInfoclick")]

        public  void insertInfoClicks([FromBody] ClickPartie[] click)
        {


            Dictionary<string,object> dic = new Dictionary<string, object> ();
          
         //   dic.Add("pseudo", _pseudo);
         //var select =   this._gameDAO.getPartieByDate( dic);
         //            var idPartie = (int)select.numPartie;
                        //string insertSql = "INSERT INTO gamed (numPartie,numClick,valClickchrono) VALUES(@numPartie,@numClick,@valClick)";
            Dictionary<int, Dictionary<string, object>> args = new Dictionary<int, Dictionary<string, object>>();
            for (int i = 0; i < click.Length; i++)
            {
                Dictionary<string, object> dico = new Dictionary<string, object>();
                Console.WriteLine("num click : " + click[i].numClick);
                Console.WriteLine("val Chrono" + click[i].valClickChrono);
                dico.Add("numClick", click[i].numClick);
                dico.Add("valClick", click[i].valClickChrono);
                args.Add(i, dico);
                       }
            this._gameDAO.insertClicks(args);
        }
        [HttpPost("getValMoyenneClick")]

        public object getClickMoyen([FromBody]User user)
        {
            Dictionary<string, object> dico = new Dictionary<string, object>();
            dico.Add("pseudo", user.pseudo);
            Console.WriteLine("le pseudo clickMoyen "+user.pseudo);
            var clickMoyen = this._gameDAO.getClickMoyen(dico);
            if(clickMoyen != null)
            {
                Console.WriteLine(clickMoyen);
                return clickMoyen;
            }
            return null;

        }
        //requete pour recuperer les parties du joueur avec son nom
        [HttpGet("getPartiesJoueur")]
        public List<Game> getPartieJoueurBypSeudo([FromBody] User pseudo) {
            List<Game> listePartie = new List<Game>();
            _myConnection = new MySqlConnection(_connectionString);
            _myConnection.Open();
            var chrono = 0;
            var pseudoJoueur = pseudo.pseudo;
            string sql = "SELECT valMoyenneChrono WHERE pseudo = @pseudo ORDER BY dateHeure DESC LIMIT 1";
            using (MySqlCommand command = new MySqlCommand(sql, _myConnection))
            {
                command.Parameters.AddWithValue("@pseudo", pseudoJoueur);
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        chrono= Convert.ToInt32(reader["valMoyenneChrono"]);
                        Console.WriteLine("La valeur moyenne du chrono est : "+chrono);
                    }
                }
                //command.ExecuteNonQuery ();

            }


            return listePartie;
        
        }


    }
}