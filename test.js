const mongoose = require('mongoose');
const config = require('./config/config.json');

const classModel = require('./api/models/class');
const agencyModel = require('./api/models/agency');

const lawDocumentSchema = require('./api/schemas/lawDocument');
const lawDocumentModel = mongoose.model('LawDocument', lawDocumentSchema);

const validityStatusSchema = require('./api/schemas/validityStatus');
const validityStatusModel = mongoose.model(
  'ValidityStatus',
  validityStatusSchema
);

const fs = require('fs');

mongoose.connect(config.connectionDatabase, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db successfully!');
    // insertValidityStats();
    let startDate = new Date('1/1/2017');
    let endDate = new Date('12/31/2017');
    console.log(startDate.toTimeString());
  }
});

const insertValidityStats = () => {
  let status = [];
  validityStatusModel.find();
  // fs.readFile('./data.txt', 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(data);
  // });
  lawDocumentModel
    .find()
    .populate('agency class validityStatus')
    .exec()
    .then(results => {
      results.forEach(result => {
        console.log(result);
      });
    })
    .catch(err => console.log(err));
  // fs.readFile('./data.json', (err, data) => {
  //   // console.log(JSON.parse(data));
  //   data = JSON.parse(data);
  //   data.forEach(ele => {
  //     lawDocumentModel
  //       .create(ele)
  //       .then(result => console.log(result))
  //       .catch(err => console.log(err));
  //   });
  // });
};
