const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
require('dotenv').config(); // ✅ Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Routes (should point to your contacts route)
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

console.log('May Node be with you');

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database is listening and Node is running on port ${PORT}`);
    });
  }
});