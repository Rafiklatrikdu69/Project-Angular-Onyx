using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private MySqlConnection myConnection;
        [HttpGet]
        public async Task<ActionResult<List<User>>> getUsers()
        {
            return new List<User>
            {
                new User
                {
                    ID = 12,
                    Name = "Rafik",
                    Email = "raffraff721@gmail.com"
                },
                new User
                {
                    ID = 13,
                    Name = "Ramazan",
                    Email = "ramazan12@gmail.com"
                }
            };
        }

        [HttpGet("insert")]
        public void createUser()
        {
            string connection = "server=127.0.0.1;user=root;database=test;password=";
            myConnection = new MySqlConnection(connection);
            myConnection.Open();
            string sql = "INSERT INTO `matable` (Nom, Age) VALUES ('Rafik', 124);";
            using (MySqlCommand command = new MySqlCommand(sql, myConnection))
            {
                command.ExecuteNonQuery();
                Console.WriteLine("Table créée avec succès !");
            }
        }


        [HttpPost("userInsert")]
        public void test([FromBody] User myObject)
        {
            string connection = "server=127.0.0.1;user=root;database=test;password=";
            myConnection = new MySqlConnection(connection);
            myConnection.Open();
            var id = myObject.ID;
            var name = myObject.Name;
            var email = myObject.Email;
            string sql = "INSERT INTO matable (Nom,Age) VALUES (@nom,@email);";
            using (MySqlCommand command = new MySqlCommand(sql, myConnection))
            {
                //command.Parameters.AddWithValue("@id",3);
                command.Parameters.AddWithValue("@nom", name);
                command.Parameters.AddWithValue("@email", email);

                command.ExecuteNonQuery();
                Console.WriteLine("Table créée avec succès !");
            }
        }
    }
}
