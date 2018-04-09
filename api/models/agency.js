const mongoose = require('mongoose');
const agencyShema = require('../schemas/agency');

const agencyModel = mongoose.model('Agency', agencyShema);

const getAllAgency = () => {
  return agencyModel.find().exec();
}

module.exports = {
  getAllAgency
}