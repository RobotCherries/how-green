import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import * as projectController from '../controllers/project.controller';

export const routes = (router: Router) => {
    router.post('/api/auth/register', authController.Register);
    router.post('/api/auth/login', authController.Login);
    router.get('/api/auth/user', authController.AuthenticatedUser);
    router.post('/api/auth/refresh', authController.Refresh);
    router.post('/api/auth/logout', authController.Logout);

    router.post('/api/projects/', projectController.Create);
    router.get('/api/projects/', projectController.FindAll);
    router.get('/api/projects/status', projectController.FindAllstatus);
    router.get('/api/projects/:id', projectController.FindOne);
    router.put('/api/projects/:id', projectController.Update);
    router.delete('/api/projects/:id', projectController.Delete);
}
