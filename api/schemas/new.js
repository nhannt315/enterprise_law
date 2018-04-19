module.exports = (sequelize, Sequelize) => {
  let lawNews = sequelize.define(
    'New',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      news_html: {
        type: Sequelize.TEXT
      },
      headlines: {
        type: Sequelize.TEXT
      },
      published_date: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      brief: {
        type: Sequelize.TEXT
      }
    },
    {
      tableName: 'news'
    }
  );
  return lawNews;
};
