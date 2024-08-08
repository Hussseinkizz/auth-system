import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import 'dotenv/config';
import router from './router/index.js';

const app = express();

const whitelist = ['http://localhost:5173', 'http://localhost:3000'];

app.use(compression());
app.use(bodyParser.json());
app.use('/', router);

app.listen(8000, () => {
    console.log('Server running on port 8000...');
});
