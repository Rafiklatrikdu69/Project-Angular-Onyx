using System.Data;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.classes;

namespace WebApplication1.Models
{
    public class GameDAO : DAO
    {
        public  void insertPartie(Dictionary<string, object> args)
        {

            string sql = "INSERT INTO gameh (pseudo,valMeilleurChrono,valMoyenneChrono,dateHeure) VALUES(@pseudo,@valMChrono,@valMoyChrono,@date);";
            this.Insert(sql, args);

        }

        public Game getPartieByDate(Dictionary<string, object> args =null)
        {
            string sql = "SELECT * FROM gameh where dateHeure = (SELECT dateHeure FROM gameh ORDER BY dateHeure DESC LIMIT 1);";
      

            DataTable tab = this.getLigne(sql, args);
            foreach (DataRow row in tab.Rows)
            {
                Game g = new Game(Convert.ToInt32(row["numPartie"]), row["pseudo"].ToString(), row["valMeilleurChrono"], row["valMoyenneChrono"], row["dateHeure"].ToString());
                // Console.WriteLine(row["pseudo"].ToString());
                return g;

            }
            return null;

        }
        public List<ClickPartie> getAllClicks(Dictionary<string, object> args = null)
        {
            List<ClickPartie> listGame = new List<ClickPartie>();
            string selectClick = "SELECT * FROM gamed WHERE @id=numPartie";
            DataTable tab = this.getLigne(selectClick, args);
            foreach (DataRow row in tab.Rows)
            {
                ClickPartie c = new ClickPartie(Convert.ToInt32(row["numPartie"]), row["numClick"].ToString(), row["valClickChrono"]);
                listGame.Add(c);
                

            }
            

            return listGame;
        }
        public void insertClicks()
        {

        }
    }
}
