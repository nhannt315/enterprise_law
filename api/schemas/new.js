const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    require: true,
    auto: true
  },
  linkToNews: {
    type: String,
    require: true
  },
  headLines: {
    type: String,
    require: true
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    require: true
  },
  brief: {
    type: String,
    require: true
  }
});

module.exports = newSchema;