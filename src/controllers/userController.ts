import { Request, Response } from 'express';
import generateTokenJwt from './utils/generateTokenJwt';
import User from '../models/user';
import emailExits from './utils/emailExists';

export default class UserController {
  static signIn(request: Request, response: Response) {

  }

  static async signUp(request: Request, response: Response) {
    const {
      nome, email, senha, telefones,
    } = request.body;

    if (await emailExits(email)) {
      return response.status(400).json({ mensagem: 'Email já existente.' });
    }

    const token = generateTokenJwt(email);

    const user = await User.create({
      nome,
      email,
      senha,
      telefones,
      ultimo_login: new Date(),
      token,
    });

    return response.status(200).json(user);
  }
}
