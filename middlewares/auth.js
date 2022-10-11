require('dotenv').config();
const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../utils/errors/error_Unauthorized');
const { errorMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ErrorUnauthorized(errorMessages.unauthorized);
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret');
  } catch (err) {
    throw new ErrorUnauthorized(errorMessages.unauthorized);
  }
  req.user = payload;
  next();
};

module.exports = auth;
