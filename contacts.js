import fs from "node:fs/promises";

import path from "path";

import { nanoid } from "nanoid";

const __dirname = path.resolve();

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументувати кожну функцію
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(data.toString()))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  fs.readFile(contactsPath)
    .then((data) => {
      const person = JSON.parse(data).find(
        (contact) => contact.id === contactId
      );
      console.log(person);
    })
    .catch((err) => console.log(err.message));
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await fs.readFile(contactsPath);

  fs.writeFile(
    contactsPath,
    JSON.stringify(
      JSON.parse(data).filter((contact) => contact.id !== contactId)
    )
  );
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  let contactId = nanoid();
  const contact = {
    id: contactId,
    name: name,
    email: email,
    phone: phone,
  };
  const data = await fs.readFile(contactsPath);

  fs.writeFile(contactsPath, JSON.stringify([...JSON.parse(data), contact]));
}
export { listContacts, getContactById, removeContact, addContact };
