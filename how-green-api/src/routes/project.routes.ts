import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { Create } from '../controllers/project.controller';

export const projectRoutes = (router: Router) => {
    router.post("/", Create);
    router.get("/", projectController.FindAll);
    router.get("/status", projectController.FindAllstatus);
    router.get("/:id", projectController.FindOne);
    router.put("/:id", projectController.Update);
    router.delete("/:id", projectController.Delete);
}
