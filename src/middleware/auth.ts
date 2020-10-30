import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export default class AuthMiddleware {
  static authenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authentication as string;

    if (!authHeader) {
      return response.status(401).json({ mensagem: 'Não autorizado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(token, config.jwtSecret);
    } catch (error) {
      return response.status(401).json({ mensagem: 'Não autorizado.' });
    }

    return next();
  }
}
