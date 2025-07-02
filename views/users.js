const express = require('express');
const router = express.Router();
const mongodb = require('../data/database');

router.get('/', async (req, res) => {
  try {
    const db = mongodb.getDb();
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

module.exports = router;