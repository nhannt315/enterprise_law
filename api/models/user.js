const mongoose = require('mongoose');
const userSchema = require('../schemas/user');

const userModel = mongoose.model('User', userSchema);

const findUserByEmail = email => {
  return userModel.find({
    email: email
  }).exec();
}

const createNewUser = (email, hashedPassword) => {
  return userModel.create({
    email: email,
    password: hashedPassword
  });
}

module.exports = {
  findUserByEmail,
  createNewUser
}