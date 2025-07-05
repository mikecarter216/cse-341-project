const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all users
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

// Get single user
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

// Create a new user
const createUser = async (req, res) => {
  try {
    const db = await mongodb.getDatabase();
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db.db().collection('users').insertOne(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = await mongodb.getDatabase();
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db.db().collection('users').replaceOne({ _id: userId }, user);

    if (result.modifiedCount > 0) {
      res.status(204).send(); // No content, successful update
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = await mongodb.getDatabase();
    const result = await db.db().collection('users').deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};