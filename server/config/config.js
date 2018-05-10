require('dotenv').config();

module.exports = {
  development: {
    url: 'postgres://postgres:dehydrogenase@127.0.0.1:5432/bookmeal',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    url: 'url',
    dialect: 'postgres'
  }
};
