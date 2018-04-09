const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agencySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    require: true,
    auto: true
  },
  name: {
    type: String,
    require: true,
    unique: true
  }
});

module.exports = agencySchema;