const { createMovie, deleteMovie, getMovies } = require('../controllers/movies');
const { createMovieValidator, idValidator } = require('../middlewares/validators');

const router = require('express').Router();

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:id', idValidator, deleteMovie);


module.exports = router;
