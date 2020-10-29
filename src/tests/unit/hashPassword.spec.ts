import hashPassword from '../../controllers/utils/hashPassword';

describe('Hash da senha do usuário', () => {
  const password = 'd2527a01ba4becaa43afbc018dfab28d233d33125a1a77c0bb2baae21bded7e5';
  it('Deve fazer o hash da senha do usuário', () => {
    const hash = hashPassword('se1nh2a3');

    expect(hash).toBe(password);
  });

  it('Não deve ser igual ao hash da senha do usuário', () => {
    const hash = hashPassword('se1nha3');

    expect(hash).not.toBe(password);
  });
});
