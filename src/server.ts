import express from 'express';
import cors from 'cors';
import Database from './database';
import Routes from './routes';

export default class Server {
  private app: express.Application;

  private database: Database

  constructor() {
    this.app = express();
    this.database = Database.connect();
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
