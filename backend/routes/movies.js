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

import app from './app';
import { Router } from 'express';
const router = Router();
import { getMovies, getMoviesById, deleteById, getMoviesByType, save, update } from '../model/moviesDB';
import exec from './utils';

router.get('/', exec(async (req, res, next) => {
    const movies = await getMovies();
        res.json(movies);
}));
router.get('/:id(\\d+)', exec(async(req, res, next) => {
    const id = req.params.id;
    const movies = await getMoviesById(id);
        res.json(movies);
    
}));
router.delete('/:id(\\d+)', exec(async(req, res, next) => {
    const id = req.params.id;
    const affectedRows = await deleteById(id);
        res.json({msg: affectedRows > 0 ? "Filme/série deletado com sucesso.": "Filmes/séries não excluído."});
}));
router.get('/:type', exec(async(req, res, next) => {
    const type = req.params.type;
    const movies = await getMoviesByType(type);
        res.json(movies);
    
}));
router.post('/', exec(async(req, res, next) => {
    const movies = await save(req.body);
        res.json(movies);
}));
router.put('/', exec(async(req, res, next) => {
    const movies = await update(req.body);
        res.json({msg: "Filme/série atualizado com sucesso."})
}));

module.exports = router;