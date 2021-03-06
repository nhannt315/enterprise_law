const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lawDocumentSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    require: true,
    auto: true
  },
  numberSymbol: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  promulgateDate: {
    type: Date
  },
  agency: {
    type: Schema.Types.ObjectId,
    ref: 'Agency',
    require: true
  },
  signer: {
    type: String,
    require: true
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    require: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  source: {
    type: String
  },
  publicationDate: {
    type: Date
  },
  scope: {
    type: String,
    require: true
  },
  applicationInfo: {
    type: String
  },
  validityStatus: {
    type: Schema.Types.ObjectId,
    ref: 'ValidityStatus',
    require: true
  },
  invalidReason: {
    type: String
  },
  linkToFile: {
    type: String,
    require: true
  },
  viewCount: {
    type: Number,
    default: 0
  }
});

// lawDocumentSchema.index({
//   '$**': 'text'
// });

module.exports = lawDocumentSchema;
