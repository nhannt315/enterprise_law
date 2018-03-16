
module.exports = (sequelize, Sequelize) => {
  let lawDocument = sequelize.define('LawDocument', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    numberSymbol: {
      type: Sequelize.STRING(50),
      notEmpty: true
    },
    description: Sequelize.TEXT,
    promulgateDate: Sequelize.BIGINT(11),
    agencyId: {
      type: Sequelize.STRING(1000),
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'Agencies',
        key: 'name'
      }
    },
    signer: {
      type: Sequelize.TEXT,
      notEmpty: true
    },
    class: {
      type: Sequelize.INTEGER,
      notEmpty: true,
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'Classes',
        key: 'id'
      }
    },
    startDate: {
      type: Sequelize.INTEGER(11),
      notEmpty: true
    },
    endDate: {
      type: Sequelize.INTEGER(11),
      notEmpty: true
    },
    source: {
      type: Sequelize.TEXT
    },
    publicationDate: {
      type: Sequelize.INTEGER(11),
    },
    scope: {
      type: Sequelize.TEXT,
      notEmpty: true
    },
    applycationInfo: {
      type: Sequelize.TEXT
    },
    validityStatus: {
      type: Sequelize.TEXT
    },
    invalidReason: {
      type: Sequelize.TEXT
    },
    linkToFile: {
      type: Sequelize.TEXT,
      notEmpty: true
    }
  }, {
    tableName: 'LawDocuments'
  });
  return lawDocument;
}