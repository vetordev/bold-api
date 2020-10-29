import generateTokenJwt from '../../controllers/utils/generateTokenJwt';

describe('Criação do token JWT', () => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.dml0b3IuMTNAZW1haWwuY29t.jB92C6bxQHZdRpkKilBAbckKdP-6b8UvMELSEcDEC70';

  it('Deve gerar o token JWT', () => {
    const generatedToken = generateTokenJwt('vitor.13@email.com');

    expect(generatedToken).toBe(token);
  });

  it('Não deve ser igual ao token JWT', () => {
    const generatedToken = generateTokenJwt('vitor.1@email.com');

    expect(generatedToken).not.toBe(token);
  });
});
