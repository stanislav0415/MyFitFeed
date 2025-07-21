import jsonWebToken from '../lib/jsonwebtoken.js';
import { AUTH_COOKIE_NAME, JWT_SECRET } from '../config/index.js';

export async function auth(req, res, next) {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        return next();
    }

    try {
        const user = await jsonWebToken.verify(token, JWT_SECRET);

        req.user = user;
        req.isAuthenticated = true;
        res.locals.user = user;
        res.locals.isAuthenticated = true;

        next();
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        res.redirect('/users/login');
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