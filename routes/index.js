const routes = require('express').Router();
const { createUser, login, jwtClear, getCurrentUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../utils/errors/error_Not_Found');

routes.post('/signup', createUser);
routes.post('/signin', login);
routes.get('/jwtclear', jwtClear);
routes.use('/users', require('./users'));
routes.use(auth);

routes.use('*', (req, res, next) => {
    next(new ErrorNotFound('Такого запроса нет'));
});

module.exports = routes;