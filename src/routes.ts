import { Request, Response, Router } from 'express';
import UserController from './controllers/userController';
import AuthMiddleware from './middleware/auth';

export default class Routes {
  routes: Router;

  constructor() {
    this.routes = Router();

    this.routes.get('/', (request: Request, response: Response) => {
      response.json('Hello');
    });
  }

  user() {
    this.routes.post('/user', UserController.signUp);
    this.routes.post('/signin/user', UserController.signIn);

    this.routes.get('/user/:user_id', AuthMiddleware.authenticate, UserController.getUser);
  }
}
