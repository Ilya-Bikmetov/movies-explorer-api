require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorBadRequest = require('../utils/errors/error_Bad_Request');
const ErrorConflict = require('../utils/errors/error_Conflict');
const ErrorUnauthorized = require('../utils/errors/error_Unauthorized');
const ErrorNotFound = require('../utils/errors/error_Not_Found');
const { errorMessages } = require('../utils/constants');

const { SALT_ROUNDS = 10, JWT_SECRET, NODE_ENV } = process.env;

const createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    const responseUser = user.toObject();
    delete responseUser.password;
    res.send(responseUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ErrorBadRequest(errorMessages.badRequest));
      return;
    }
    if (err.code === 11000) {
      next(new ErrorConflict(errorMessages.conflictUser));
      return;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ErrorUnauthorized(errorMessages.unauthorizedUser);
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new ErrorUnauthorized(errorMessages.unauthorizedUser);
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret',
    );
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.send({ message: errorMessages.successAuthorization });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new ErrorNotFound(errorMessages.notFoundUser);
    }
    res.send({ user });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { name, email, id = req.user._id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, email }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new ErrorNotFound(errorMessages.notFoundUser);
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.kind === 'ObjectId') {
      next(new ErrorBadRequest(errorMessages.badRequest));
      return;
    }
    if (err.codeName === 'DuplicateKey') {
      next(new ErrorConflict(errorMessages.conflictEmail));
    }
    next(err);
  }
};

const jwtClear = (req, res) => {
  res.clearCookie('jwt');
  res.end();
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
  jwtClear,
};
