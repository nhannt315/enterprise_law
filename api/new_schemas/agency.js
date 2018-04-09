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
    require: true
  },
  level: {
    type: String,
    require: true
  },
  province: {
    type: String,
    require: true
  }
});

module.exports = agencySchema;