const vntk = require('vntk');
const LawDocument = require('./api/schemas').LawDocument;
const News = require('./api/schemas').New;
const Classes = require('./api/schemas').Class;
const Agencies = require('./api/schemas').Agency;

const NewsMongo = require('./api/new_schemas/new');
const ClassMongo = require('./api/new_schemas/class');
const AgencyMongo = require('./api/new_schemas/agency');
const LawDocumentMongo = require('./api/new_schemas/lawDocument');

const mongoose = require('mongoose');
const config = require('./config/config.json');

const newModel = mongoose.model('New', NewsMongo);
const classModel = mongoose.model('Class', ClassMongo);
const agencyModel = mongoose.model('Agency', AgencyMongo);
const lawDocumentModel = mongoose.model('LawDocument', LawDocumentMongo);

const chunking = vntk.chunking();
const ner = vntk.ner();
var tfidf = new vntk.TfIdf();

let flag = 2;

mongoose.connect(config.connectionDatabase, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db successfully!');
    lawDocumentModel
      .findOne()
      .populate('class')
      .populate('agency')
      .exec()
      .then(res => {
        console.log(res);
      })
      .catch(err => {});
    copyNewData();
    // copyClassData();
    // copyAgency();
    // copyLawDocument();
  }
});

// LawDocument.findAll().then(results => {
//   results.forEach(result => {
//     if (flag <= 2) {
//       const des = results[flag].dataValues.description;
//       const tagArr = ner.tag(des);
//       tfidf.addDocument(des);
//       console.log(des);
//       tagArr.forEach(tag => {
//         if (tag[1] === 'N') {
//           tfidf.tfidfs(tag[0], (i, measure) => {
//             console.log(tag[0] + ':' + measure);
//           })
//         }
//       });
//     }
//     flag++;
//   });
// });

function parseDate(source) {
  let dateParts = source.split('/');
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}

function copyLawDocument() {
  let i = 1;
  LawDocument.findAll().then(results => {
    results.forEach(result => {
      // console.log(result.dataValues);
      let newDocument = {
        numberSymbol: result.dataValues.numberSymbol,
        description: result.dataValues.description,
        promulgateDate: new Date(result.dataValues.promulgateDate),
        signer: result.dataValues.signer,
        startDate: new Date(result.dataValues.startDate),
        endDate: new Date(result.dataValues.endDate),
        source: result.dataValues.source,
        publicationDate: new Date(result.dataValues.publicationDate),
        scope: result.dataValues.scope,
        applicationInfo: result.dataValues.applycationInfo,
        validityStatus: result.dataValues.validityStatus,
        invalidReason: result.dataValues.invalidReason,
        linkToFile: result.dataValues.linkToFile
      };
      // console.log(result.dataValues);
      agencyModel
        .findOne({ name: result.dataValues.agencyId })
        .exec()
        .then(res => {
          newDocument.agency = res._id;
          Classes.findAll({ where: { id: result.dataValues.class } }).then(
            classRes => {
              classModel
                .findOne({
                  name: classRes[0].dataValues.name
                })
                .exec()
                .then(classMongoRes => {
                  // console.log(classMongoRes);
                  newDocument.class = classMongoRes._id;
                  lawDocumentModel
                    .create(newDocument)
                    .exec()
                    .then(res => {
                      console.log(res);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });
            }
          );
        });

      // Classes.findAll({
      //   where: {

      //   }
      // })
      i++;
    });
  });
}

function copyAgency() {
  Agencies.findAll().then(results => {
    results.forEach(result => {
      const newAgency = {
        name: result.dataValues.name,
        level: result.dataValues.level,
        province: result.dataValues.province
      };
      agencyModel.create(newAgency, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    });
  });
}

function copyClassData() {
  Classes.findAll().then(results => {
    results.forEach(result => {
      console.log(result.dataValues);
      classModel.create({ name: result.dataValues.name }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    });
  });
}

function copyNewData() {
  News.findAll().then(results => {
    results.forEach(result => {
      // console.log(result.dataValues);
      const newObject = {
        newsHtml: result.dataValues.news_html,
        headLines: result.dataValues.headlines,
        publishedDate: parseDate(result.dataValues.published_date),
        image: result.dataValues.image,
        brief: result.dataValues.brief
      };
      newModel.create(newObject, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    });
  });
}

// console.log(ner.tag('Nghị định do chính phủ ban hành từ năm 2014 đến 2017'));
