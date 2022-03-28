/*const app = require('../../app');

module.exports = app => {

    const connection = require('../database/connection');
    
    app.get('/movies', (require, response) => {
        const sql = 'SELECT * FROM movies';
        connection.query(sql, (error, res) => {
            if (error){
                return error;
            } console.log("movies: ", res);
            response.json(res)
        })
    })
};*/

const express = require('express');
const router = express.Router();
const MoviesDB = require('../model/moviesDB');

router.get('/', (req, res) => {
    MoviesDB.getMovies((movies) => {
        res.json(movies)
    });
});
router.get('/:id(\\d+)', (req, res) => {
    const id = req.params.id;
    MoviesDB.getMoviesById(id, (movies) => {
        res.json(movies);
    });
});
router.delete('/:id(\\d+)', (req, res) => {
    const id = req.params.id;
    console.log("deletar movies " + id);
    MoviesDB.deleteById(id, (affectedRows) => {
        res.json({msg: "Filme/série deletado com sucesso."})
    });
});
router.get('/:type', (req, res) => {
    const type = req.params.type;
    MoviesDB.getMoviesByType(type, (movies) => {
        res.json(movies);
    });
});
router.post('/', (req, res) => {
    const movies = req.body;
    MoviesDB.save(movies, (movies) => {
        res.json(movies);
    });
});
router.put('/', (req, res) => {
    const movies = req.body;
    MoviesDB.update(movies,(movies) => {
        res.json({msg: "Filme/série atualizado com sucesso."})
    });
});
module.exports = router;