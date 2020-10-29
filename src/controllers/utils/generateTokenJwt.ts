import jwt from 'jsonwebtoken';
import config from '../../config/config';

export default function generateTokenJwt(payload: Number) {
  return jwt.sign(payload, config.jwtSecret);
}
