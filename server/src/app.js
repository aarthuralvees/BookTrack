import express from 'express';
import 'dotenv/config';
import router from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => console.log("Server rodando em http://localhost:3000"));