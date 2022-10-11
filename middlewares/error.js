const { errorServer } = require('../utils/constants');
const { errorMessages } = require('../utils/constants');

const error = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(errorServer).send({ message: errorMessages.serverError });
  }
  next();
};

module.exports = error;
