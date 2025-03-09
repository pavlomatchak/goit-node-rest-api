import User from '../db/models/User.js';
import gravatar from 'gravatar';

export async function findUser(query) {
  const user = await User.findOne({ where: query });
  return user;
}

export function registerUser({ email, password }) {
  const avatarURL = gravatar.url(email);
  return User.create({ email, password, avatarURL });
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
