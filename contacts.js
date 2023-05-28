const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(
  path.parse(__filename).dir,
  "db",
  "contacts.json"
);

// TODO: document each function
async function listContacts() {
  const contactList = await fs
    .readFile(contactsPath)
    .then((data) => data.toString());

  console.log(contactList);
}

async function getContactById(contactId) {
  const contactList = await fs
    .readFile(contactsPath)
    .then((data) => data.toString());

  const contactArray = JSON.parse(contactList);

  const foundContact = contactArray.find((contact) => contact.id === contactId);

  console.log(foundContact);
}

async function removeContact(contactId) {
  const contactList = await fs
    .readFile(contactsPath)
    .then((data) => data.toString());

  const contactArray = JSON.parse(contactList);

  const newContacts = contactArray.filter(
    (contact) => contact.id !== contactId
  );

  const parsedNew = JSON.stringify(newContacts);

  fs.writeFile(contactsPath, parsedNew);
  console.log("Removal successful");
}

async function addContact(name, email, phone) {
  const contactList = await fs
    .readFile(contactsPath)
    .then((data) => data.toString());

  const id = JSON.stringify(Date.now());

  const contactArray = JSON.parse(contactList);

  contactArray.push({ id, name, email, phone });
  const arrayJson = JSON.stringify(contactArray);
  fs.writeFile(contactsPath, arrayJson);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
