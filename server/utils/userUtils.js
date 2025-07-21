
import jsonwebToken from '../lib/jsonwebtoken.js'
import { JWT_SECRET } from '../config/index.js';



export async function generateAuthToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
    }

    const token = await jsonwebToken.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    return token;
}