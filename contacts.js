const fs = require("fs");
const path = require("path");

const contactsPath = path.join(
  path.parse(__filename).dir,
  "db",
  "contacts.json"
);

console.log(contactsPath);
