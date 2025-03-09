import HttpError from '../helpers/HttpError.js';
import { findUser } from '../services/authServices.js';
import { verifyToken } from '../helpers/jwt.js';

async function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, 'No authorization header'));
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Invalid authorization header'));
  }

  const { data, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, error.message));
  }

  const user = await findUser({ email: data.email });
  if (!user) {
    return next(HttpError(401, 'Not authorized'));
  }

  req.user = user;

  next();
}
export default authenticate;
