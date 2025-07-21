import express from 'express';
import cors from 'cors';
import initDatabase from './config/dbConfig.js';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/authMiddleware.js';
import routes from './routes.js';

const app = express();


await initDatabase();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(3000, () => console.log('Server is listening on http://localhost:3000'));
