const express = require('express');
const Router = express.Router();
const HttpStatus = require('http-status');

const statusModel = require('../models/validityStatus');

Router.get('/getAll', (req, res, next) => {
  statusModel
    .getAllStatus()
    .then(result => {
      res.status(HttpStatus.OK).json(result);
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: err
      })
    });
});

module.exports = Router;
