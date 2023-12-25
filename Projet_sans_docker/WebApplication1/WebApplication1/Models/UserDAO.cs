using System.Data;
using MySql.Data.MySqlClient;
using WebApplication1.classes;

namespace WebApplication1.Models
{
    public class UserDAO : DAO
    {
        public User SelectAllUsers(string sql, Dictionary<string, object> args)
        {
            DataTable tab = this.getLigne(sql, args);
            foreach (DataRow row in tab.Rows)
            {
                User u = new User(Convert.ToInt32(row["id"]), row["pseudo"].ToString());
               // Console.WriteLine(row["pseudo"].ToString());
                return u;

            }
            return null;
            


        }
    }
}
