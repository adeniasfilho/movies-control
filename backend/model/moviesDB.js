const mysql = require('mysql');

//classe moviesDB
class MoviesDB {
    //Função para conectar no banco de dados
    static connect() {
        //Criando conexão com MySQL
        const connection = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password: ' ',
            database: 'movies-control'
        });
        //Conecta no banco de dados
        connection.connect();
        return connection; 
    }
    //Retorna lista de filmes e séries
    static getMovies() {
        return new Promise((resolve, reject) => {
            const connection = MoviesDB.connect();
            //Cria uma consulta
            const sql = "SELECT * FROM movies";
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
            connection.end();
        });
    }
    //Retorna a lista de filmes e séries por tipo do banco de dados
    static getMoviesByType(type) {
        return new Promise((resolve, reject) => {
            const connection = MoviesDB.connect();
            //Cria uma consulta
            const sql = "SELECT id,type,name,total_ep,atual_ep,last_view FROM movies WHERE type= '" + type + "'";
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
            //Fecha a conexão
            connection.end();
        });
    }
    //Retorna a lista de carros
    static getMoviesById(id) {
        return new Promise((resolve, reject) => {
            const connection = MoviesDB.connect();
            const sql = "SELECT * FROM movies WHERE id=?";
            connection.query(sql, id, (error, results, fields) => {
               if(error) {
                   reject(error);
               } else {
                   if(results.length == 0) {
                       reject(Error("Nenhum filme/série encontrado."));
                       return
                   }
                   //Encontrou o filme/série
                   const movies = results[0];
                   resolve(movies);
               }
            });
            connection.end();
        })
    }
    //Salva um filme/série no banco de dados
    static save(movies) {
        return new Promise((resolve, reject) => {
            const connection = MoviesDB.connect();
            //Insere o carro
            const sql = "INSERT INTO movies set ?";
            connection.query(sql, movies,(error,results,fields) => {
                if (error) {
                    reject(error);
                } else {
                    //Atualiza o objeto filme/serie do parâmetro com id inserido
                    movies.id = results.insertId;
                    resolve(movies);
                }
            });
            connection.end();
        });   
    }
    //Atualiza um filme/série no banco de dados
    static update(movies) {
        return new Promise((resolve, reject) => {
            const connection = MoviesDB.connect();
            //SQL para atualizar o filme/série
            const sql = "UPDATE movies SET ? WHERE id=?";
            const id = movies.id;
            connection.query(sql, [movies, id], (error,results,fields) => {
                if (error) {
                    reject(error);
                } else {
                    reslove(movies);
                }
            });
            connection.end();
        }) 
    }
    //Deleta um filme/série no banco de dados
    static delete(movies) {
        return new Promise((resolve, reject) => {
            const connection = MoviesDB.connect();
            //SQL para deletar o filme/série
            const sql = "DELETE FROM movies WHERE id=?";
            const id = movies.id;
            connection.query(sql, id, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(movies);
                }
            });
            connection.end();
        })
    } 
    //Deleta um filme/série pelo id
    static deleteById(id) {
        return new Promise((resolve, reject) => {
            const connection = MoviesDB.connect();
            // SQL para deletar o filme/série
            const sql = "DELETE FROM movies WHERE id=?";
            connection.query(sql, id,(error, results, fields) => {
               if (error) {
                   reject(error);
               } else {
                   resolve(results.affectedRows)
               }
            });
            connection.end();
        });
    }
}
module.exports = MoviesDB;