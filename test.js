const vntk = require('vntk');
const LawDocument = require('./api/schemas').LawDocument;

const chunking = vntk.chunking();
const ner = vntk.ner();
var tfidf = new vntk.TfIdf();


let flag = 2;

LawDocument.findAll().then(results => {
  results.forEach(result => {
    if (flag <= 2) {
      const des = results[flag].dataValues.description;
      const tagArr = ner.tag(des);
      tfidf.addDocument(des);
      console.log(des);
      tagArr.forEach(tag => {
        if (tag[1] === 'N') {
          tfidf.tfidfs(tag[0], (i, measure) => {
            console.log(tag[0] + ':' + measure);
          })
        }
      });
    }
    flag++;
  });
});

// console.log(ner.tag('Nghị định do chính phủ ban hành từ năm 2014 đến 2017'));
