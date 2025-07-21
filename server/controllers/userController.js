import { Router } from "express";
import userService from "../services/userService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { AUTH_COOKIE_NAME } from "../config/index.js";
import { getErrorMessage } from "../utils/errorUtils.js";
const userController = Router();

userController.post('/register', isGuest, async (req, res) => {
  try {
   
    const { user, token } = await userService.register(req.body);

    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});

userController.post('/login', isGuest, async (req, res) => {
  try {
    const { user, token } = await userService.login(req.body.email, req.body.password);

    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ error: getErrorMessage(err) });
  }
});

userController.post('/logout', isAuth, (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.json({ message: 'Logout successful' });
});

export default userController;
