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
  searchType,
  agencyId,
  validityStatus,
  lawClass,
  publicationYear,
  signer
) => {
  let searchCondition = {};
  if (searchType === 'title') {
    searchCondition = { description: { $regex: '.*' + keyword + '.*' } };
  } else if (searchType === 'number') {
    searchCondition = { numberSymbol: { $regex: '.*' + keyword + '.*' } };
  }
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
  lawDocumentModel
    .find(searchCondition)
    .populate('class agency validityStatus')
    .limit(perPage)
    .skip(perPage * pageIndex)
    .exec()
    .then(doc => {
      console.log(doc);
    });

  lawDocumentModel
    .count(searchCondition)
    .exec()
    .then(doc => {
      console.log(doc);
    });

  console.log(searchCondition);
  return Promise.all([
    lawDocumentModel
      .find(searchCondition)
      .populate('class agency validityStatus')
      .limit(perPage)
      .skip(perPage * pageIndex)
      .exec(),
    lawDocumentModel.count(searchCondition).exec()
  ]);
};

const getMostViewedLaw = itemNumber => {
  return lawDocumentModel
    .find()
    .limit(itemNumber)
    .sort({ viewCount: -1 })
    .exec();
};

const getNewestLaw = itemNumber => {
  return lawDocumentModel
    .find()
    .limit(itemNumber)
    .sort({ promulgateDate: -1 })
    .exec();
};

const getLawDocumentDetail = documentId =>
  lawDocumentModel
    .find({ _id: documentId })
    .populate('class agency validityStatus')
    .exec();

const updateLawDocument = (documentId, updateData) => {
  return lawDocumentModel
    .findOneAndUpdate({ _id: documentId }, updateData)
    .exec();
};
module.exports = {
  getAllDocument,
  searchDocument,
  getLawDocumentDetail,
  updateLawDocument,
  getNewestLaw,
  getMostViewedLaw
};
