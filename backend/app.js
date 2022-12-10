require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const path = require('path');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://lackluster-party.students.nomoredomains.club',
  ],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cookieParser());
app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/mestodb');
