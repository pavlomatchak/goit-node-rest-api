import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { nanoid } from 'nanoid';

const contactsPath = resolve('db', 'contacts.json');

export async function listContacts() {
  const data = await readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) return null;
  const contactToRemove = contacts.splice(contactIndex, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactToRemove;
}

export async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export async function updateContact(contactId, data) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) return null;
  contacts[contactIndex] = { ...contacts[contactIndex], ...data };
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
}
