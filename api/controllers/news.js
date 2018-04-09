const express = require('express');
const Router = express.Router();

const newModel = require('../models/news');

Router.get('/all', (req, res, next) => {
  newModel
    .getAllNewsFromDB()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

module.exports = Router;
