
module.exports = (sequelize, Sequelize) => {
  let agency = sequelize.define('Agency', {
    name: {
      primaryKey: true,
      type: Sequelize.STRING(1000),
      notEmpty: true
    },
    level: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    province:{
      type: Sequelize.STRING,
      notEmpty: true
    }
  }, {
    tableName: 'Agencies'
  });

  return agency;
}