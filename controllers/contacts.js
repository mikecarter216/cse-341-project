const { ObjectId } = require('mongodb');
const db = require('../data/database');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await db.getDb().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
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
    console.error('Error fetching contact:', error);
    res.status(500).json({ message: 'Failed to fetch contact', error });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact
};