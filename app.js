const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001, MONGO_URI = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

app.use(cookieParser());
app.use(express.json());


  