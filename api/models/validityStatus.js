const mongoose = require('mongoose');
const validityStatusSchema = require('../schemas/validityStatus');

const validityStatusModel = mongoose.model(
  'ValidityStatus',
  validityStatusSchema
);

const getAllStatus = () => {
  return validityStatusModel.find().exec();
};

module.exports = {
  getAllStatus
}
