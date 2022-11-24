const Movie = require('../models/movie');
const ErrorBadRequest = require('../utils/errors/error_Bad_Request');
const ErrorForbidden = require('../utils/errors/error_Forbidden');
const ErrorNotFound = require('../utils/errors/error_Not_Found');
const { errorMessages } = require('../utils/constants');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id }).populate('owner');
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      owner: req.user._id,
    });
    await movie.populate('owner');
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ErrorBadRequest(errorMessages.badRequest));
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new ErrorNotFound(errorMessages.notFoundMovie);
    }
    if (movie.owner.valueOf() === req.user._id) {
      await Movie.deleteOne({ _id: id });
      res.send(movie);
    } else {
      throw new ErrorForbidden(errorMessages.forbiddenMovie);
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new ErrorBadRequest(errorMessages.badRequestMovie));
      return;
    }
    next(err);
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovies,
};
