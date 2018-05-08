const express = require('express');
const Router = express.Router();
const HttpStatus = require('http-status');

const lawDocumentModel = require('../models/lawDocument');

Router.get('/getAll', (req, res, next) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const page = Math.max(1, req.query.page) - 1;
  const lawClass = req.query.classId;
  const agencyId = req.query.agencyId;
  const validityStatus = req.query.status;
  const promulgateYear = req.query.year;
  lawDocumentModel
    .getAllDocument(
      page,
      perPage,
      lawClass,
      agencyId,
      promulgateYear,
      validityStatus
    )
    .then(result => {
      res.status(HttpStatus.OK).json({
        total: result[1],
        data: result[0]
      });
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: err
      });
    });
});

Router.get('/newest', (req, res, next) => {
  const itemNumber = parseInt(req.query.itemNumber) || 5;
  lawDocumentModel
    .getNewestLaw(itemNumber)
    .then(result => {
      res.status(HttpStatus.OK).json(result);
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: err
      });
    });
});

Router.get('/mostviewed', (req, res, next) => {
  const itemNumber = parseInt(req.query.itemNumber) || 5;
  lawDocumentModel
    .getMostViewedLaw(itemNumber)
    .then(result => {
      res.status(HttpStatus.OK).json(result);
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: err
      });
    });
});

Router.get('/detail/:id', (req, res, next) => {
  lawDocumentModel
    .getLawDocumentDetail(req.params.id)
    .then(result => {
      result[0].viewCount += 1;
      lawDocumentModel.updateLawDocument(result[0]._id, {
        viewCount: result[0].viewCount
      });
      return res.status(HttpStatus.OK).json(result);
    })
    .catch(err => {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: err
      });
    });
});

Router.get('/search', (req, res, next) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const page = Math.max(1, req.query.page) - 1;
  const keyword = req.query.keyword;
  const classId = req.query.classId;
  const agencyId = req.query.agencyId;
  const signer = req.query.signer;
  const validityStatus = req.query.status;
  const searchType = req.query.searchType;
  lawDocumentModel
    .searchDocument(
      page,
      perPage,
      keyword,
      searchType,
      agencyId,
      validityStatus,
      classId,
      null,
      signer
    )
    .then(result => {
      res.status(HttpStatus.OK).json({
        total: result[1],
        data: result[0]
      });
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: err
      });
    });
});

module.exports = Router;
