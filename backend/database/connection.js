
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cogndio ',
    database: 'movies-control'
})
connection.connect();

module.exports = connection;