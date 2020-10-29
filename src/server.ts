import express from 'express';

export default class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  routes() {
    this.app.get('/', (request, response) => {
      response.json('Hello');
    });
  }

  init(port: Number) {
    this.app.listen(port);
  }
}
