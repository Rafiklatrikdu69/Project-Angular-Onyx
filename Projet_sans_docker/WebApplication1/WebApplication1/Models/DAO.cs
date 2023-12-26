using Google.Protobuf.Collections;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public abstract class DAO
    {
        public async Task<MySqlCommand> _requeteAsync(string sql, Dictionary<string, object> args = null)
        {
            Singleton singleton = Singleton.Instance;

            using (MySqlCommand command = new MySqlCommand(sql, singleton.getBdd()))
            {
                if (args != null)
                {
                    foreach (var arg in args)
                    {
                        command.Parameters.AddWithValue(arg.Key, arg.Value);
                    }
                }

                await command.ExecuteNonQueryAsync();

                return command;
            }
        }

        public DataTable _getLigne(string sql, Dictionary<string, object> args = null)
        {
            var statement = this._requete(sql, args);
            DataTable dt = new DataTable();

            using (MySqlDataReader reader = Task.Run(() => statement.ExecuteReader()).Result)
            {
                dt.Load(reader);
            }

            return dt;
        }

        public DataTable _getLignes(string sql, Dictionary<string, object> args = null)
        {
            Singleton singleton = Singleton.Instance;
            var statement = this._requete(sql, args);
            DataTable dt = new DataTable();

            using (MySqlDataReader reader = Task.Run(() => statement.ExecuteReader()).Result)
            {
                dt.Load(reader);
            }

            return dt;
        }


        public async Task InsertAsync(string sql, Dictionary<string, object> args = null)
        {
            await this._requeteAsync(sql, args);
        }

        // Fonctions synchrones avec les mêmes noms

        public MySqlCommand _requete(string sql, Dictionary<string, object> args = null)
        {
            Singleton singleton = Singleton.Instance;

            lock (singleton) // Utilise un verrou pour s'assurer que les requêtes sont exécutées séquentiellement
            {
                using (MySqlCommand command = new MySqlCommand(sql, singleton.getBdd()))
                {
                    if (args != null)
                    {
                        foreach (var arg in args)
                        {
                            command.Parameters.AddWithValue(arg.Key, arg.Value);
                        }
                    }

                    command.ExecuteNonQuery();

                    return command;
                }
            }
        }

        public DataTable getLigne(string sql, Dictionary<string, object> args = null)
        {
            var statement = this._requete(sql, args);
            DataTable dt = new DataTable();

            using (MySqlDataReader reader = statement.ExecuteReader())
            {
                dt.Load(reader);
            }

            return dt;
        }

        public DataTable getLignes(string sql, Dictionary<string, object> args = null)
        {
            Singleton singleton = Singleton.Instance;
            var statement = this._requete(sql, args);
            DataTable dt = new DataTable();

            using (MySqlDataReader reader = statement.ExecuteReader())
            {
                dt.Load(reader);
            }

            return dt;
        }

        public void Insert(string sql, Dictionary<string, object> args = null)
        {
            this._requete(sql, args);
        }
    }
}
