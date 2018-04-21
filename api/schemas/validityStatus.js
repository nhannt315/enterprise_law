const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validityStatusSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    require: true,
    auto: true
  },
  name: {
    type: String,
    require: true
  }
});

module.exports = validityStatusSchema;