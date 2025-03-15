import express from 'express';

import * as authControllers from '../controllers/authControllers.js';
import validateBody from '../helpers/validateBody.js';
import controllerWrapper from '../decorators/controllerWrapper.js';
import { loginSchema, registerSchema } from '../schemas/authShema.js';
import authenticate from '../middleware/authenticate.js';
import upload from '../middleware/upload.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), controllerWrapper(authControllers.registerUser));

authRouter.post('/login', validateBody(loginSchema), controllerWrapper(authControllers.loginUser));

authRouter.get('/current', authenticate, controllerWrapper(authControllers.getCurrent));

authRouter.post('/logout', authenticate, controllerWrapper(authControllers.logoutUser));

authRouter.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(authControllers.uploadAvatar));

export default authRouter;
