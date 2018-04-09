const mongoose = require('mongoose');
const classSchema = require('../schemas/class');

const classModel = mongoose.model('Class', classSchema);

const getAllClass = () => {
  return classModel.find().exec();
}

module.exports = {
  getAllClass
}

