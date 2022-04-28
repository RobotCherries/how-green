import { Router } from 'express';
import { AuthorizeUser } from '../common/middlewares/authorize-user.middleware';
import * as applianceController from '../controllers/appliance.controller';
import * as authController from '../controllers/auth.controller';
import * as projectController from '../controllers/project.controller';

export const routes = (router: Router) => {
    router.post('/api/auth/register', authController.Register);
    router.post('/api/auth/login', authController.Login);
    router.get('/api/auth/user', authController.AuthenticatedUser);
    router.post('/api/auth/refresh', authController.Refresh);
    router.post('/api/auth/logout', authController.Logout);

    router.post('/api/projects/', [AuthorizeUser, projectController.Create]);
    router.get('/api/projects/', [AuthorizeUser, projectController.GetAll]);
    router.get('/api/projects/:id', [AuthorizeUser, projectController.GetOne]);
    router.get('/api/projects/:id/score', [AuthorizeUser, projectController.GetScore]);
    router.put('/api/projects/:id', [AuthorizeUser, projectController.Update]);
    router.delete('/api/projects/:id', [AuthorizeUser, projectController.Delete]);

    router.get('/api/projects/:id/appliances', [AuthorizeUser, applianceController.GetAll]);
    router.get('/api/projects/:id/appliances/:applianceId', [AuthorizeUser, applianceController.GetOne]);
    router.post('/api/projects/:id/appliances', [AuthorizeUser, applianceController.Create]);
    router.put('/api/projects/:id/appliances/:applianceId', [AuthorizeUser, applianceController.Update]);
    router.delete('/api/projects/:id/appliances/:applianceId', [AuthorizeUser, applianceController.Delete]);

}
