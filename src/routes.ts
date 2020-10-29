import { Request, Response, Router } from 'express';

export default class Routes {
  routes: Router;

  constructor() {
    this.routes = Router();

    this.routes.get('/', (request: Request, response: Response) => {
      response.json('Hello');
    });
  }

  user() {
    this.routes.get('/user', (request: Request, response: Response) => {
      response.json('Usuário');
    });
  }
}
