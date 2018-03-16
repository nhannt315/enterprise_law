const Sequelize = require('sequelize');

module.exports = (sequelize, a) => {
  let lawClass = sequelize.define('Class', {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: Sequelize.STRING(50),
      notEmpty: true
    }
  },{
    tableName: 'Classes'
  });
  return lawClass;
}