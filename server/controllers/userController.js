import { Router } from "express";
import userService from "../services/userService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { AUTH_COOKIE_NAME } from "../config/index.js";

const userController = Router();

userController.post('/register', isGuest, async (req, res) => {
  const userData = req.body;

  try {
    const token = await userService.register(userData);

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});

userController.post('/login', isGuest, async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(401).json({ error: getErrorMessage(err) });
  }
});

userController.post('/logout', isAuth, (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.json({ message: 'Logout successful' });
});

export default userController;
