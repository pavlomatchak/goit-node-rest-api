import User from '../db/models/User.js';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import sendEmail from '../helpers/sendEmail.js';

const { BASE_URL } = process.env;

export async function findUser(query) {
  const user = await User.findOne({ where: query });
  return user;
}

export async function registerUser({ email, password }) {
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({ email, password, avatarURL, verificationToken });

  await sendEmail({
    to: email,
    subject: 'Test email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify</a>`,
  });

  return newUser;
}

async function updateUser(query, data) {
  const user = await findUser(query);
  if (!user) {
    return null;
  }

  return user.update(data, { returning: true });
}

export async function logoutUser(id) {
  return updateUser({ id }, { token: null });
}

export async function updateAvatar(id, avatarURL) {
  return updateUser({ id }, { avatarURL });
}

export async function resendVerify(email, token) {
  return sendEmail({
    to: email,
    subject: 'Test email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${token}">Click to verify</a>`,
  });
}
