const mongoose = require('mongoose');
const lawDocumentSchema = require('../schemas/lawDocument');
const Promise = require('bluebird');

const lawDocumentModel = mongoose.model('LawDocument', lawDocumentSchema);

const getAllDocument = (pageIndex, perPage) => {
  return Promise.all([
    lawDocumentModel
      .find()
      .limit(perPage)
      .skip(perPage * pageIndex)
      .exec(),
    lawDocumentModel.count().exec()
  ]);
};

const searchDocument = (
  pageIndex,
  perPage,
  keyword,
  agencyId,
  validityStatus,
  lawClass,
  publicationYear,
  signer
) => {
  let searchCondition = {};
  searchCondition = { description: { $regex: '.*' + keyword + '.*' } };
  if (agencyId) {
    searchCondition.agency = agencyId;
  }
  if (validityStatus) {
    searchCondition.validityStatus = validityStatus;
  }
  if (lawClass) {
    searchCondition.class = lawClass;
  }

  if (signer) {
    searchCondition.signer = { $regex: '.*' + signer + '.*' };
  }

  console.log(searchCondition);
  return (
    lawDocumentModel
      .find(searchCondition)
      // .populate('class agency validityStatus')
      .limit(perPage)
      .skip(perPage * pageIndex)
      .exec()
  );
};

module.exports = {
  getAllDocument,
  searchDocument
};
