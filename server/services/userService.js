import User from '../models/user.js';
import { generateAuthToken } from '../utils/userUtils.js';
import bcrypt from 'bcrypt';

export default {
  async register(userData) {

  if (userData.password !== userData.rePassword) {
    throw new Error('Password Mismatch');
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists!');
  }
  const existingUsername = await User.findOne({ username: userData.username });
  if (existingUsername) {
    throw new Error('Username is taken!');
  }
  const { rePassword, ...userDataToSave } = userData;

  const newUser = await User.create(userDataToSave);

  const token = await generateAuthToken(newUser);

  const user = newUser.toObject();
  delete user.password;

  return { user, token };
},

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('No such user exists!');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid username or password!');
    }

    const token = await generateAuthToken(user);

    const userData = user.toObject();
    delete userData.password;

    return { user: userData, token };
  }
};
