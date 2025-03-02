import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    const data = jwt.verify(token, JWT_SECRET);

    return { data };
  }
  catch (error) {
    return { error };
  }
}
