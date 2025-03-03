import bcrypt from 'bcrypt';

import * as authServices from '../services/authServices.js';
import HttpError from '../helpers/HttpError.js';
import { createToken } from '../helpers/jwt.js';

function findUser(query) {
  return authServices.findUser(query);
}

export async function registerUser(req, res) {
  const user = await findUser({ email: req.body.email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const result = await authServices.registerUser({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
}

export async function loginUser(req, res) {
  const user = await findUser({ email: req.body.email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);

  if (isValidPassword) {
    const token = createToken({ email: req.body.email });
    await user.update({ token });
    res.status(200).json({
      token,
    });
  } else {
    throw HttpError(401, 'Email or password is wrong');
  }
}

export function getCurrent(req, res) {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
}

export async function logoutUser(req, res) {
  const { id } = req.user;
  await authServices.logoutUser(id);

  res.status(204).json({
    message: "Logged out",
  });
}
