const express = require('express');
const Router = express.Router();

const classModel = require('../models/class');

Router.get('/getAll', (req, res, next) => {
  classModel
    .getAllClass()
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