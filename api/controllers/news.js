const express = require("express");
const Router = express.Router();

const newModel = require("../models/news");

Router.get("/all", (req, res, next) => {
  const perPage = parseInt(req.query.perPage);
  const page = Math.max(0, req.query.page);
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

Router.get("/:id", (req, res, next) => {
  newModel
    .getNewsByIdFromDB(req.params.id)
    .then(result => {
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
