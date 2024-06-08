const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jokesdb', 'your-username', 'your-password', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.jokes = require('./joke')(sequelize, Sequelize);

module.exports = db;