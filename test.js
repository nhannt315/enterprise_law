const mongoose = require('mongoose');
const config = require('./config/config.json');

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
    insertValidityStats();
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
    // .populate('ValidityStatus')
    .find()
    .exec()
    .then(results => {
      results.forEach(result => {
        // console.log(result.validityStatus);
      });
      fs.writeFile('./data.json', results, err=> console.log(err));

    })
    .catch(err => {});
};
