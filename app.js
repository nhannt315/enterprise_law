const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/config.json');

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

const models = require('./api/schemas');

models.sequelize
  .sync()
  .then(() => {
    console.log('Nice! Database looks fine');
  })
  .catch(err => {
    console.log(err, 'Something went wrong with the Database Update!');
  });

mongoose.connect(config.connectionDatabase, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db successfully!');
  }
});

module.exports = app;
