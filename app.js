require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { errorLogger } = require('express-winston');
const limiter = require('./middlewares/limiter');
const { requestLogger } = require('./middlewares/logger');
const routes = require('./routes');
const error = require('./middlewares/error');

const { PORT = 3001, MONGO_URI } = process.env;
const app = express();

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
