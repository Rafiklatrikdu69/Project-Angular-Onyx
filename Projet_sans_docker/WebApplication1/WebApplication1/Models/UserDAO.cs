using System.Data;
using MySql.Data.MySqlClient;
using WebApplication1.classes;

namespace WebApplication1.Models
{
    public class UserDAO : DAO
    {
        public User SelectUser(Dictionary<string, object> args)
        {
            string sql = "SELECT * from utilisateur where pseudo =@nom ";
            DataTable tab = this.getLigne(sql, args);
            foreach (DataRow row in tab.Rows)
            {
                User u = new User(Convert.ToInt32(row["id"]), row["pseudo"].ToString());
               // Console.WriteLine(row["pseudo"].ToString());
                return u;

            }
            return null;
            


        }
        public void InsertUser(Dictionary<string, object> args)
        {
            string sql = "INSERT INTO utilisateur (pseudo) VALUES (@pseudo);";
            this.Insert(sql,args);
            

        }
    }
}
