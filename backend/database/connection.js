import { createConnection } from 'mysql';
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: ' ',
    database: 'movies-control'
})
connection.connect();

export default connection;