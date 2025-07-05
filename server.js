const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`✅ Database is connected. Node server is running on port ${PORT}`);
    });
  }
});