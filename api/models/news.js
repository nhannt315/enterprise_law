const mongoose = require('mongoose');
const newSchema = require('../schemas/new');

const newModel = mongoose.model('New', newSchema);

const getAllNewsFromDB = (pageIndex, itemPerPage) => {
  if (pageIndex && itemPerPage) {
    return newModel
      .find()
      .limit(itemPerPage)
      .skip(pageIndex * itemPerPage)
      .exec();
  }
  return newModel.find().exec();
};

module.exports = {
  getAllNewsFromDB
};
