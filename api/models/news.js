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
        .sort({ publishedDate: -1 })
        .exec(),
      newModel.count().exec()
    ]);
  }
  return Promise.all([newModel.find().exec(), newModel.count().exec()]);
};

const getNewsByIdFromDB = id => {
  return newModel.find({ _id: id }).exec();
};

const updateNews = (id, updateData) => {
  return newModel.findOneAndUpdate({ _id: id }, updateData).exec();
};

module.exports = {
  getAllNewsFromDB,
  getNewsByIdFromDB
};
