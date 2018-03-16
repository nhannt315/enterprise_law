const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(morgan('dev'));
app.use(bodyParser.json({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.options('*', cors());


const models = require('./api/models');

models.sequelize.sync().then(() => {
  console.log('Nice! Database looks fine');
}).catch(err => {
  console.log(err, "Something went wrong with the Database Update!")
})


module.exports = app;