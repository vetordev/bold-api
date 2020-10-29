import * as dotenv from 'dotenv';
import Server from './server';

dotenv.config({
  path: '.env',
});

const server = new Server();

server.routes();
server.init(Number(process.env.PORT));
