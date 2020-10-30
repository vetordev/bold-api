import express from 'express';
import cors from 'cors';
import Routes from './routes';

export default class Server {
  app: express.Application;

  constructor() {
    this.app = express();
  }

  routes() {
    this.app.use(cors());
    this.app.use(express.json());

    const routes = new Routes();
    routes.user();

    this.app.use(routes.routes);
  }

  init(port: Number) {
    this.app.listen(port);
  }
}
