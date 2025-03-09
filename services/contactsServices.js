import Contact from '../db/models/Contact.js';

export function listContacts(query) {
  return Contact.findAll({ where: query });
}

export function getContact(query) {
  return Contact.findOne({  where: query });
}

export async function removeContact(query) {
  return Contact.destroy({ where: query });
}

export function addContact(data) {
  return Contact.create(data);
}

export async function updateContact(query, data) {
  const contact = await getContact(query);
  if (!contact) return null;
  return contact.update(data, { returning: true });
}
