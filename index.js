const contacts = require("./contacts");
const argv = require("yargs").argv;

contacts.listContacts();
contacts.getContactById("1685553915321");
// contacts.removeContact("rsKkOQUi80UsgVPCcLZZW");
contacts.addContact("rafal sz", "rafal.rafal@rafal.com", "555444333");
