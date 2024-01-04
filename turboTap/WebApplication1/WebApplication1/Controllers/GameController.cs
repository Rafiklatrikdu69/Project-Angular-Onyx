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

    /// <author>
    /// Rafik BOUCHENNA
    /// </author>
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private GameDAO _gameDAO;
        public static string _pseudo;
       public GameController()
        {
            this._gameDAO = new GameDAO();
        }
        /// <summary>
        /// Insertion de l'utilisateur dans la bd 
        /// </summary>
        /// <param name="myObject"></param>
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
        /// <summary>
        /// recuperation de de la partie 
        /// </summary>
        /// <param name="pseudo"></param>
        /// <returns></returns>
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
        /// <summary>
        /// insertion des clicks
        /// </summary>
        /// <param name="click"></param>
        [HttpPost("insertInfoclick")]

        public  void insertInfoClicks([FromBody] ClickPartie[] click)
        {


            Dictionary<string,object> dic = new Dictionary<string, object> ();
          
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
        /// <summary>
        /// recuperation du click moyen 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
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
        /// <summary>
        /// requete pour recuperer les parties du joueur avec son nom
        /// </summary>
        /// <param name="pseudo"></param>
        /// <returns></returns>
        [HttpPost("getPartiesJoueur")]
        public List<Game> getPartieJoueurBypSeudo([FromBody] User pseudo) {
    
            Dictionary<string, object> args = new Dictionary<string, object>();
            args.Add("pseudo", pseudo.pseudo);

            
            List<Game> listePartie = this._gameDAO.getAllPartiesPseudo(args);
            if (listePartie != null)
            {
                return listePartie;
            }
            return null;
        
        }
        /// <summary>
        /// recuperation de toutes les parties 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getParties")]
        public List<Game> getAllPartie()
        {
           


            List<Game> listePartie = this._gameDAO.getAllParties();
            if (listePartie != null)
            {
                return listePartie;
            }
            return null;
        }
        [HttpPost("allClickPartie")]
        public List<ClickPartie> ClickPartie([FromBody] ClickPartie click)
        {
            Dictionary<string, object> args = new Dictionary<string, object>();
            args.Add("numPartie", click.numPartie);
            var clickPartie = this._gameDAO.getAllClickPartie(args);
            if(clickPartie!= null)
            {
                Console.WriteLine(clickPartie[0].numPartie);
                return clickPartie;
            }
            return null;
        }


    }
}