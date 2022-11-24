const router = require('express').Router();
const { createMovie, deleteMovie, getMovies } = require('../controllers/movies');
const { createMovieValidator, idValidator } = require('../middlewares/validators');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:id', idValidator, deleteMovie);

module.exports = router;
