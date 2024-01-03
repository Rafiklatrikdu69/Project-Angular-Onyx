using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.classes;

namespace WebApplication1.Models
{
    public class GameDAO : DAO
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        public  void insertPartie(Dictionary<string, object> args)
        {

            string sql = "INSERT INTO gameh (pseudo,valMeilleurChrono,valMoyenneChrono,dateHeure) VALUES(@pseudo,@valMChrono,@valMoyChrono,@date);";
            this.Insert(sql, args);

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public Game getPartieByDate(Dictionary<string, object> args)
        {
            string sql = "SELECT * FROM gameh WHERE  pseudo = @pseudo AND dateHeure = (SELECT dateHeure FROM gameh ORDER BY dateHeure DESC LIMIT 1) ;";
            if(args == null)
            {
                Console.WriteLine("Cest  null !!!!");

            }
            else
            {
                DataTable tab = this.getLigne(sql, args);
                foreach (DataRow row in tab.Rows)
                {
                    Game g = new Game(Convert.ToInt32(row["numPartie"]), row["pseudo"].ToString(), row["valMeilleurChrono"], row["valMoyenneChrono"], row["dateHeure"].ToString());
                    // Console.WriteLine(row["pseudo"].ToString());
                    return g;

                }
            }

           
            return null;

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public List<ClickPartie> getAllClicks(Dictionary<string, object> args = null)
        {
            List<ClickPartie> listGame = new List<ClickPartie>();
            string selectClick = "SELECT g.* FROM gameh g JOIN gamed gd ON gd.numPartie = g.numPartie WHERE g.pseudo = @pseudo ORDER BY g.dateHeure DESC LIMIT 1;";
            DataTable tab = this.getLigne(selectClick,args);
            var idPartie = 0;
            foreach (DataRow row in tab.Rows)
            {
                idPartie = (int)row["numPartie"];
                Console.WriteLine("le num de la partie mec quoicoubeh : " + row["numPartie"]);
            }
            Dictionary<string, object> numPartie = new Dictionary<string, object>();
            numPartie.Add("numPartie", idPartie);
            string select = "SELECT * FROM gamed WHERE numPartie=@numPartie";
           DataTable tableau = this.getLignes(select, numPartie);
            foreach (DataRow row in tableau.Rows)
            {
                ClickPartie c = new ClickPartie(Convert.ToInt32(row["numPartie"]), row["numClick"].ToString(), row["valClickChrono"]);
                listGame.Add(c);
                

            }
            

            return listGame;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        public void insertClicks(Dictionary<int, Dictionary<string, object>> args = null)
        {
            string insertSql = "INSERT INTO gamed (numPartie,numClick,valClickchrono) VALUES(@numPartie,@numClick,@valClick);";
            string selectClick = "SELECT * FROM gameh WHERE dateHeure = (SELECT dateHeure FROM gameh ORDER BY dateHeure DESC LIMIT 1);";
                DataTable tab = this.getLigne(selectClick);
            var idPartie = 0;
            foreach (DataRow row in tab.Rows)
            {
                idPartie= (int)row["numPartie"];
                Console.WriteLine("le num de la partie mec quoicoubeh : " + row["numPartie"]);
            }

            foreach (var kvp1 in args)
            {
             
                var parameters = new Dictionary<string, object>();

               
                parameters.Add("numPartie", idPartie);

                foreach (var kvp2 in kvp1.Value)
                {
                    parameters.Add(kvp2.Key, kvp2.Value);
                }

                Console.WriteLine("Key = {0}, Inner Dict:", kvp1.Key);

            
                this.Insert(insertSql, parameters);
            }


            foreach (var kvp1 in args)
            {
                foreach (var kvp2 in kvp1.Value)
                {
                    Console.WriteLine("Val : "+kvp2.Value);

                }

            }


        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public object getClickMoyen(Dictionary<string, object> args = null)
        {
            string sql = "SELECT valMoyenneChrono FROM gameh WHERE pseudo = @pseudo  AND dateHeure = (SELECT dateHeure FROM gameh ORDER BY dateHeure DESC LIMIT 1);";
            DataTable click = this.getLigne(sql, args);
            foreach (DataRow row in click.Rows)
            {
             return  row["valMoyenneChrono"];
                
            }
            return null;
        }
        public List<Game> getAllPartiesPseudo(Dictionary<string,object> args)
        {
            List<Game> listeGame = new List<Game>();
            string sql = "SELECT * FROM gameh WHERE pseudo =@pseudo";
            var tab = this.getLignes(sql,args);
            foreach(DataRow row in tab.Rows)
            {
                Game g = new Game(Convert.ToInt32(row["numPartie"]), row["pseudo"].ToString(), row["valMeilleurChrono"], row["valMoyenneChrono"], row["dateHeure"].ToString());
                listeGame.Add(g);
            }
            return listeGame;
        }
        public List<Game> getAllParties()
        {
            List<Game> listeGame = new List<Game>();
            string sql = "SELECT * FROM gameh";
            var tab = this.getLignes(sql);
            foreach (DataRow row in tab.Rows)
            {
                Game g = new Game(Convert.ToInt32(row["numPartie"]), row["pseudo"].ToString(), row["valMeilleurChrono"], row["valMoyenneChrono"], row["dateHeure"].ToString());
                listeGame.Add(g);
            }
            return listeGame;
        }
          public List<ClickPartie> getAllClickPartie( Dictionary<string,object> args)
        {
            List<ClickPartie> listeClick = new List<ClickPartie>();
            string sql = "SELECT * FROM gamed where numPartie=@numPartie";
            var tab = this.getLignes(sql,args);
            foreach (DataRow row in tab.Rows)
            {
                ClickPartie c = new ClickPartie(Convert.ToInt32(row["numPartie"]), row["numClick"].ToString(), row["valClickChrono"]);
                listeClick.Add(c);
                
            }
            return listeClick;
        }
    }
}
