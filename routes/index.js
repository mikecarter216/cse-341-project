const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use('/user', require('./users'));

module.exports = router;