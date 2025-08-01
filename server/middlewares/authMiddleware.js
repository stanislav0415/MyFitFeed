import jsonWebToken from '../lib/jsonwebtoken.js';

import { JWT_SECRET } from '../config/index.js';

export async function auth(req, res, next) {
  const authHeader = req.headers['authorization'];


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1]?.trim();

  if (!token) {

    return res.status(401).json({ message: 'Token missing or malformed' });
  }

  
  try {
    const user = await jsonWebToken.verify(token, JWT_SECRET);
    
    req.user = user;
    req.isAuthenticated = true;
    res.locals.user = user;
    res.locals.isAuthenticated = true;
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function isAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.redirect('/users/login');
    }
    next();
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated) {
        return res.redirect('/');
    }
    next();
}