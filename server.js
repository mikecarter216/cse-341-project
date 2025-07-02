const express = require('express');
const mongodb = require('./data/database');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', require('./views/index'));

mongodb.initDb((err) =>{
  if (err) {
    console.log(err);
  } else {
   app.listen(PORT, () => {console.log('database is listening and node running on port ${PORT}');});
  }
})