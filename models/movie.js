const mongoose = require('mongoose');
const { urlRegExp } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (exp) => urlRegExp.test(exp),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (exp) => urlRegExp.test(exp),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (exp) => urlRegExp.test(exp),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
