const express = require('express');
const Router = express.Router();
const HttpStatus = require('http-status');

const newModel = require('../models/news');

Router.get('/all', (req, res, next) => {
  const perPage = parseInt(req.query.perPage);
  const page = Math.max(1, req.query.page) - 1;
  newModel
    .getAllNewsFromDB(page, perPage)
    .then(result => {
      res.status(200).json({
        total: result[1],
        data: result[0]
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

Router.get('/mostViewed', (req, res, next) => {
  const itemNumber = parseInt(req.query.itemNumber) || 5;
  newModel
    .getMostViewedNews(itemNumber)
    .then(result => {
      res.status(HttpStatus.OK).json(result);
    })
    .catch(error => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: error
      });
    });
});

Router.get('/:id', (req, res, next) => {
  newModel
    .getNewsByIdFromDB(req.params.id)
    .then(result => {
      result[0].viewCount += 1;
      newModel.updateNews(result[0]._id, { viewCount: result[0].viewCount });
      res.status(200).json({
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

module.exports = Router;
