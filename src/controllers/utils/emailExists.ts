import User from '../../models/user';

export default async function emailExits(email: string) {
  const user = await User.findOne({ email });

  return user;
}
