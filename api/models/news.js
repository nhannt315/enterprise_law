const mongoose = require('mongoose');
const newSchema = require('../schemas/new');

const newModel = mongoose.model('New', newSchema);

const getAllNewsFromDB = callback => {
  return newModel.find().exec();
};

module.exports = {
  getAllNewsFromDB
};
