import Server from './server';
import config from './config/config';

const server = new Server();

server.routes();
server.init(Number(config.port));
