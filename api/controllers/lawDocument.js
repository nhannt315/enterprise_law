const express = require('express');
const Router = express.Router();

const lawDocumentModel = require('../models/lawDocument');

Router.get('/getAll', (req, res, next) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const page = Math.max(0, req.query.page);
  console.log('test:',page + " " + perPage);
  lawDocumentModel
    .getAllDocument(page, perPage)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      })
    });
});

module.exports = Router;
