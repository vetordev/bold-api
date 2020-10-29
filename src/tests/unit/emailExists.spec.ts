import generateTokenJwt from '../../controllers/utils/generateTokenJwt';
import hashPassword from '../../controllers/utils/hashPassword';
import emailExists from '../../controllers/utils/emailExists';
import User from '../../models/user';
import Database from '../../database';

describe('Verificação do e-mail do usuário', () => {
  beforeAll(async () => {
    Database.connect();

    await User.create({
      nome: 'Vitor',
      email: 'vitor.14@gmail.com',
      senha: hashPassword('seNhA4'),
      telefones: [{
        numero: '952316039',
        ddd: '11',
      }],
      ultimo_login: new Date(),
      token: generateTokenJwt('vitor.14@gmail.com'),
    });
  });

  afterAll(() => {
    Database.disconnect();
  });

  it('', () => {});
});
