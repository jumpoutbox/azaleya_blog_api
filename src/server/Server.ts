import express from 'express';
import path from 'path';
import './shared/services/TranslationsYup';
import { router } from './routes';

const server = express();

server.use(express.json());
server.use('/images', express.static(path.join(__dirname, '..', 'uploads')))
server.use(router);

export { server };
