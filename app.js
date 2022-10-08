const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const helmet = require('helmet');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const { requestLogger } = require('./middlewares/logger');
const { errorLogger } = require('express-winston');

const { PORT = 3001, MONGO_URI = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
