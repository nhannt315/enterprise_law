const express = require('express');
const Router = express.Router();
const HttpStatus = require('http-status');

const lawDocumentModel = require('../models/lawDocument');

Router.get('/getAll', (req, res, next) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const page = Math.max(0, req.query.page);
  console.log('test:', page + ' ' + perPage);
  lawDocumentModel
    .getAllDocument(page, perPage)
    .then(result => {
      res.status(HttpStatus.OK).json(result);
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: err
      });
    });
});

Router.get('/search', (req, res, next) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const page = Math.max(0, req.query.page);
  const keyword = req.query.keyword;
  lawDocumentModel
    .searchDocument(page, perPage, keyword)
    .then(result => {
      res.status(HttpStatus.OK).json(result);
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: err
      });
    });
});

module.exports = Router;
