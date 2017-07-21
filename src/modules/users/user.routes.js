import {Router} from 'express';

import {authLocal} from '../../services/auth.services';
import * as userController from './user.controllers';

const routes = new Router();

routes.post('/signup', userController.signUp);
routes.post('/login', authLocal, userController.login);

export default routes;