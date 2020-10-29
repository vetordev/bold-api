import generateTokenJwt from '../../controllers/utils/generateTokenJwt';
import hashPassword from '../../controllers/utils/hashPassword';
import emailExists from '../../controllers/utils/emailExists';
import User from '../../models/user';
import Database from '../../database';

describe('Verificação do e-mail do usuário', () => {
  beforeAll(async () => {
    const user = {
      nome: 'Vitor',
      email: 'vitor.13@gmail.com',
      senha: hashPassword('seNhA4'),
      telefones: [{
        numero: '952316039',
        ddd: '11',
      }],
      ultimo_login: new Date(),
      token: generateTokenJwt('vitor.13@gmail.com'),
    };

    Database.connect();

    await User.findOneAndDelete({ email: user.email });

    await User.create(user);
  });

  afterAll(() => {
    Database.disconnect();
  });

  it('Deve encontrar o e-mail do usuário', async () => {
    const user: any = await emailExists('vitor.13@gmail.com');

    expect(user).not.toBeNull();
    expect(user.email).toBe('vitor.13@gmail.com');
  });
});
