const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const db = await mongodb.getDatabase();
    const users = await db.db().collection('users').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = await mongodb.getDatabase();
    const user = await db.db().collection('users').findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
};

module.exports = {
  getAll,
  getSingle
};