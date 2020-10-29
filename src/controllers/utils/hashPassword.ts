import sha256 from 'crypto-js/sha256';

export default function hashPassword(password: string) {
  const hash = sha256(password);

  return hash.toString();
}
