import * as contactsServices from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsServices.listContacts({ owner });
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.getContact({ id, owner });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.removeContact({ id, owner });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsServices.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, 'Body must have at least one field');
  }

  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.updateContact({ id, owner }, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.updateContact({ id, owner }, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};
