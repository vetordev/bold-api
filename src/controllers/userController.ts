import { Request, Response } from 'express';
import generateTokenJwt from './utils/generateTokenJwt';
import User from '../models/user';
import emailExits from './utils/emailExists';
import hashPassword from './utils/hashPassword';

export default class UserController {
  static async signIn(request: Request, response: Response) {
    const { email, senha } = request.body;

    let user = await User.findOne({ email, senha: hashPassword(senha) });

    if (!await emailExits(email)) {
      return response.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    if (!user) {
      return response.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    user = await User.findOneAndUpdate({
      email, senha: hashPassword(senha),
    }, {
      ultimo_login: new Date(),
    });
    return response.status(200).json(user);
  }

  static async signUp(request: Request, response: Response) {
    const {
      nome, email, senha, telefones,
    } = request.body;

    if (await emailExits(email)) {
      return response.status(400).json({ mensagem: 'E-mail já existente.' });
    }

    const token = generateTokenJwt(email);

    const user = await User.create({
      nome,
      email,
      senha: hashPassword(senha),
      telefones,
      ultimo_login: new Date(),
      token,
    });

    return response.status(200).json(user);
  }

  static async getUser(request: Request, response: Response) {
    const authentication = request.headers.authentication as string;
    const token = authentication.split(' ')[1];

    const user: any = await User.findById(request.params.user_id);
    const date: any = new Date();

    if (!user) {
      return response.status(401).json({ mensagem: 'Não autorizado.' });
    }

    if (user.token !== token) {
      return response.status(401).json({ mensagem: 'Não autorizado.' });
    }

    if (date - user.ultimo_login > (1800000)) {
      return response.status(401).json({ mensagem: 'Sessão inválida.' });
    }

    return response.status(200).json(user);
  }
}
// 17:57
