﻿using MySql.Data.MySqlClient;

namespace WebApplication1.Models
{
    public class Singleton
    {
        private static Singleton instance = null;
        private MySqlConnection _myConnection;
        Singleton() { 
            string connection = "server=127.0.0.1;user=root;database=Onyx;password=";
             _myConnection = new MySqlConnection(connection);
            _myConnection.Open();
        }

        public static Singleton Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Singleton();
                }
                return instance;
            }
        }

        public MySqlConnection getBdd()
        {
       
            return _myConnection;
        }
    }
}
