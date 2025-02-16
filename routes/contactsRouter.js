import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from '../controllers/contactsControllers.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';
import validateBody from '../helpers/validateBody.js';
import controllerWrapper from '../decorators/controllerWrapper.js';

const contactsRouter = express.Router();

contactsRouter.get('/', controllerWrapper(getAllContacts));

contactsRouter.get('/:id', controllerWrapper(getOneContact));

contactsRouter.delete('/:id', controllerWrapper(deleteContact));

contactsRouter.post('/', validateBody(createContactSchema), controllerWrapper(createContact));

contactsRouter.put('/:id', validateBody(updateContactSchema), controllerWrapper(updateContact));

export default contactsRouter;
