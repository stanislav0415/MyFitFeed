import express from 'express';
import cors from 'cors';
import initDatabase from './config/dbConfig.js';

const app = express();


await initDatabase();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());



app.listen(3000, () => console.log('Server is listening on http://localhost:3000'));
