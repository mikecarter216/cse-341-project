const { ObjectId } = require('mongodb');
const db = require('../data/database');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await db.getDb().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error });
  }
};

// GET a single contact by ID
const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = await db.getDb().collection('contacts').findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contact', error });
  }
};

// POST: Create a new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.getDb().collection('contacts').insertOne(newContact);

    res.status(201).json({ message: 'Contact created', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create contact', error });
  }
};

// PUT: Update an existing contact
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const updatedContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.getDb().collection('contacts').replaceOne({ _id: contactId }, updatedContact);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Contact not found or not updated' });
    }

    res.status(204).send(); // Success, no content
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact', error });
  }
};

// DELETE: Delete a contact
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await db.getDb().collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send(); // Success, no content
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact', error });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};