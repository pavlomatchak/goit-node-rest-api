import User from '../db/models/User.js';

export async function findUser(query) {
  const user = await User.findOne({ where: query });
  return user;
}

export function registerUser({ email, password }) {
  return User.create({ email, password });
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
