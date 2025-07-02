const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database already initialized!');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client.db();
      console.log('Database connected successfully');
      callback(null, database);
    })
    .catch((err) => {
      console.error('Failed to connect to database:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDb
};