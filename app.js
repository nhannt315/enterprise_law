const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const HttpStatus = require('http-status');

const config = require('./config/config.json');
const newsApi = require('./api/controllers/news');
const classApi = require('./api/controllers/class');
const agencyApi = require('./api/controllers/agency');
const lawDocumentApi = require('./api/controllers/lawDocument');
const validityStatusApi = require('./api/controllers/validityStatus');
const userApi = require('./api/controllers/user');

app.use(morgan('dev'));
app.use(
  bodyParser.json({
    extended: true
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.options('*', cors());
mongoose.connect(config.connectionDatabase, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db successfully!');
  }
});

app.use('/news', newsApi);
app.use('/class', classApi);
app.use('/agency', agencyApi);
app.use('/lawDocument', lawDocumentApi);
app.use('/status', validityStatusApi);
app.use('/user', userApi);

app.use((req, res, next) => {
  res.status(HttpStatus.NOT_FOUND).json({
    error: 'Not found'
  });
});




module.exports = app;