const mongoose = require('mongoose');
const lawDocumentSchema = require('../schemas/lawDocument');

const lawDocumentModel = mongoose.model('LawDocument', lawDocumentSchema);

const getAllDocument = (pageIndex, perPage) => {
  if (pageIndex && perPage) {
    return lawDocumentModel
      .find()
      .limit(perPage)
      .skip(perPage * pageIndex)
      .exec();
  }
  return lawDocumentModel.find().limit(perPage).exec();
};

module.exports = {
  getAllDocument
};
