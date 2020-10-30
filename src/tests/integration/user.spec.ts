// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import hashPassword from '../../controllers/utils/hashPassword';
import generateTokenJwt from '../../controllers/utils/generateTokenJwt';
import User from '../../models/user';
import Server from '../../server';
import Database from '../../database';

describe('User', () => {
  let app;

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

  beforeAll(() => {
    Database.connect();

    const server = new Server();
    server.routes();
    app = server.app;
  });

  afterAll(() => {
    Database.disconnect();
  });

  describe('Criação de um usuário', () => {
    beforeAll(async () => {
      await User.collection.drop();
      await User.createCollection();
    });

    it('Deve criar um usuário', async () => {
      const response = await request(app)
        .post('/user')
        .send(user);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        _id: expect.any(String),
        nome: expect.any(String),
        email: expect.any(String),
        senha: expect.any(String),
        telefones: [{
          numero: expect.any(String),
          ddd: expect.any(String),
        }],
        ultimo_login: expect.any(String),
        data_criacao: expect.any(String),
        data_atualizacao: expect.any(String),
        token: expect.any(String),
        __v: expect.any(Number),
      }));
    });

    it('Não deve criar um usuário (e-mail já existente)', async () => {
      const response = await request(app)
        .post('/user')
        .send(user);

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        mensagem: 'E-mail já existente.',
      }));
    });
  });

  describe('Sessão do usuário', () => {
    beforeAll(async () => {
      await User.collection.drop();
      await User.createCollection();
      await User.create(user);
    });

    it('Deve iniciar a sessão do usuário', async () => {
      const response = await request(app)
        .post('/signin/user')
        .send({
          email: 'vitor.13@gmail.com',
          senha: 'seNhA4',
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        _id: expect.any(String),
        nome: expect.any(String),
        email: expect.any(String),
        senha: expect.any(String),
        telefones: [{
          numero: expect.any(String),
          ddd: expect.any(String),
        }],
        ultimo_login: expect.any(String),
        data_criacao: expect.any(String),
        data_atualizacao: expect.any(String),
        token: expect.any(String),
        __v: expect.any(Number),
      }));
    });

    it('Não deve iniciar a sessão do usuário (e-mail inexistente)', async () => {
      const response = await request(app)
        .post('/signin/user')
        .send({
          email: 'vitor.12@gmail.com',
          senha: 'seNhA4',
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({
        mensagem: 'Usuário e/ou senha inválidos.',
      }));
    });

    it('Não deve iniciar a sessão do usuário (senha incorreta)', async () => {
      const response = await request(app)
        .post('/signin/user')
        .send({
          email: 'vitor.13@gmail.com',
          senha: 'seNhA3',
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({
        mensagem: 'Usuário e/ou senha inválidos.',
      }));
    });
  });

  describe('Buscar um usuário', () => {
    let userId;
    let token = generateTokenJwt(user.email);

    beforeAll(async () => {
      await User.collection.drop();
      await User.createCollection();

      const createdUser = await User.create(user);

      // eslint-disable-next-line no-underscore-dangle
      userId = createdUser._id;
    });

    it('Deve retornar o usuário', async () => {
      const response = await request(app)
        .get(`/user/${userId}`)
        .set('Authentication', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        _id: expect.any(String),
        nome: expect.any(String),
        email: expect.any(String),
        senha: expect.any(String),
        telefones: [{
          numero: expect.any(String),
          ddd: expect.any(String),
        }],
        ultimo_login: expect.any(String),
        data_criacao: expect.any(String),
        data_atualizacao: expect.any(String),
        token: expect.any(String),
        __v: expect.any(Number),
      }));
    });

    it('Não deve retornar o usuário (Authentication não enviado)', async () => {
      const response = await request(app)
        .get(`/user/${userId}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({
        mensagem: 'Não autorizado.',
      }));
    });

    it('Não deve retornar o usuário (token inválido)', async () => {
      const response = await request(app)
        .get(`/user/${userId}`)
        .set('Authentication', `Bearer ${token}errado`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({
        mensagem: 'Não autorizado.',
      }));
    });
    it('Não deve retornar o usuário (user_id inválido)', async () => {
      const response = await request(app)
        .get(`/user/${userId}123c4`)
        .set('Authentication', `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({
        mensagem: 'Não autorizado.',
      }));
    });

    it('Não deve retornar o usuário (token não é igual ao do usuário)', async () => {
      token = 'eyJhbGciOiJIUzI1NiJ9.dml0b3IuMTMyMzRAZW1haWwuY29t.5Kl9lXZha8FhH_sr9e0cCVj7OO7FrH-a2OP0qy-7s9g';
      const response = await request(app)
        .get(`/user/${userId}`)
        .set('Authentication', `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({
        mensagem: 'Não autorizado.',
      }));
    });
  });
});
