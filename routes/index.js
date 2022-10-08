const routes = require('express').Router();
const { createUser, login, jwtClear } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { createUserValidator, loginValidator } = require('../middlewares/validators');
const ErrorNotFound = require('../utils/errors/error_Not_Found');

routes.post('/signup', createUserValidator, createUser);
routes.post('/signin', loginValidator, login);
routes.get('/signout', jwtClear);
routes.use(auth);
routes.use('/users', require('./users'));
routes.use('/movies', require('./movies'));

routes.use('*', (req, res, next) => {
  next(new ErrorNotFound('Такого запроса нет'));
});

module.exports = routes;
