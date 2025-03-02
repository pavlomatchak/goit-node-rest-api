import Contact from '../db/models/Contact.js';

export function listContacts() {
  return Contact.findAll();
}

export function getContactById(contactId) {
  return Contact.findByPk(contactId);
}

export async function removeContact(contactId) {
  return Contact.destroy({ where: { id: contactId } });
}

export function addContact(data) {
  return Contact.create(data);
}

export async function updateContact(contactId, data) {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  return contact.update(data, { returning: true });
}
