import Server from './server';
import config from './config/config';
import Database from './database';

const server = new Server();

Database.connect();
server.routes();
server.init(Number(config.port));
