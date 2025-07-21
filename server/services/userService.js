import bcrypt from 'bcrypt'
import User from "../models/user.js"
import { generateAuthToken } from '../utils/userUtils.js';


export default {
    async register(userData) {

        if (userData.password !== userData.rePassword) {
            throw new Error('Password Missmatch');
        }

        const user = await User.findOne({ email: userData.email });

        if (user) {
            throw new Error('User already exists!');

        }

        const newUser = await User.create(userData)

        const token = await generateAuthToken(newUser)

        return token;
    },

    async login(email, password) {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('No such user exists!');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid username or password!');
        }

        const token = await generateAuthToken(user)

        return token;
    }

}