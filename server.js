require('dotenv').config(); // Load environment variables
const app = require('./app'); // Express app instance
const mongodb = require('./data/database');

const PORT = process.env.PORT || 3000;

// Initialize MongoDB then start the server
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ MongoDB connection failed:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`✅ Database connected. Server running on port ${PORT}`);
    });
  }
});