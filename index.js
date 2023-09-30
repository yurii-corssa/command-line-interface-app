const { program } = require("commander");
const contacts = require("./contacts.js");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const getContacts = await contacts.listContacts();
      return console.tableremove(getContacts);

    case "get":
      const getContact = await contacts.getContactById(id);
      return console.log(getContact || null);

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);

    case "add":
      const newConcact = await contacts.addContact({ name, email, phone });
      return console.log(newConcact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "getAll" });
// invokeAction({ action: "getOne", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({ action: "delete", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({
//   action: "add",
//   name: "Kennedy Lewis",
//   email: "kennedy@utquamvel.net",
//   phone: "(296) 208-9492",
// });
invokeAction(argv);
