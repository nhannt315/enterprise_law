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
  return lawDocumentModel
    .find()
    .limit(perPage)
    .exec();
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
  console.log(searchCondition);
  if(agency){
    searchCondition.agency = agencyId;
  }
  return lawDocumentModel
    .find(searchCondition)
    .limit(perPage)
    .skip(perPage * pageIndex)
    .exec();
};

module.exports = {
  getAllDocument,
  searchDocument
};
