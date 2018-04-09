const express = require('express');
const Router = express.Router();

const agencyModel = require('../models/agency');

Router.get('/getAll', (req, res, next) => {
  agencyModel
    .getAllAgency()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).jsons({
        error: err
      });
    });
});

module.exports = Router;
