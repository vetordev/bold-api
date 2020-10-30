import User from '../../models/user';

export default async function emailExists(email: string) {
  const user = await User.findOne({ email });

  return user;
}
