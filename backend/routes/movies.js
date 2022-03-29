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
const exec = require('./utils');

router.get('/', exec(async (req, res, next) => {
    const movies = await MoviesDB.getMovies();
        res.json(movies);
}));
router.get('/:id(\\d+)', exec(async(req, res, next) => {
    const id = req.params.id;
    const movies = await MoviesDB.getMoviesById(id);
        res.json(movies);
    
}));
router.delete('/:id(\\d+)', exec(async(req, res, next) => {
    const id = req.params.id;
    const affectedRows = await MoviesDB.deleteById(id);
        res.json({msg: affectedRows > 0 ? "Filme/série deletado com sucesso.": "Filmes/séries não excluído."});
}));
router.get('/:type', exec(async(req, res, next) => {
    const type = req.params.type;
    const movies = await MoviesDB.getMoviesByType(type);
        res.json(movies);
    
}));
router.post('/', exec(async(req, res, next) => {
    const movies = await MoviesDB.save(req.body);
        res.json(movies);
}));
router.put('/', exec(async(req, res, next) => {
    const movies = await MoviesDB.update(req.body);
        res.json({msg: "Filme/série atualizado com sucesso."})
}));

module.exports = router;