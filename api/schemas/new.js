module.exports = (sequelize, Sequelize) => {
  let lawNews = sequelize.define(
    'New',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      link_to_news: {
        type: Sequelize.TEXT
      },
      headlines: {
        type: Sequelize.TEXT
      },
      published_date: {
        type: Sequelize.BIGINT(20)
      },
      image: {
        type: Sequelize.TEXT
      },
      brief: {
        type: Sequelize.TEXT
      }
    },
    {
      tableName: 'News'
    }
  );
  return lawNews;
};
