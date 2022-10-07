const { createMovie } = require('../controllers/movies');

const router = require('express').Router();

router.post('/', createMovie);


module.exports = router;
