const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();

// Middleware
app.use(bodyParser.json());

// API Routes
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

module.exports = app;