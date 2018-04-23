const mongoose = require('mongoose');
const newSchema = require('../schemas/new');
const Promise = require('bluebird');

const newModel = mongoose.model('New', newSchema);

const getAllNewsFromDB = (pageIndex, itemPerPage) => {
  if (pageIndex && itemPerPage) {
    return Promise.all([
      newModel
      .find()
      .limit(itemPerPage)
      .skip(pageIndex * itemPerPage)
      .exec(),
      newModel.count().exec()
    ])
  }
  return newModel.find().exec();
};

module.exports = {
  getAllNewsFromDB
};
