using Google.Protobuf.Collections;
using MySql.Data.MySqlClient;

namespace WebApplication1.Models
{
    abstract class DAO  
    {

        public object _requete(string sql,Array args =null)
        {
            Singleton singleton = Singleton.Instance;
            singleton.getBdd().Open();
            using (MySqlCommand command = new MySqlCommand(sql, singleton.getBdd()))
            {
                        if(args != null)
                         {
                            command.ExecuteNonQuery();
                }
                else {

                    command.Parameters.AddRange(args);
                        command.ExecuteNonQuery();

                }

                return command;
            }
            
        }
        public void select (string sql,Array args = null)
        {
            var statement = this._requete(sql, args);
            Console.Write(statement);


        }

    }
}
