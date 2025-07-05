const { ObjectId } = require('mongodb');
const db = require('../data/database');

const getAllContacts = async (req, res) => {
  const contacts = await db.getDb().collection('contacts').find().toArray();
  res.json(contacts);
};

const getSingleContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = await db.getDb().collection('contacts').findOne({ _id: contactId });
  res.json(contact);
};

module.exports = {
  getAllContacts,
  getSingleContact
};