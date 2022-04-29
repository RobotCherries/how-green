import { NextFunction, Request, Response } from "express";
import { DeleteResult, getRepository, UpdateResult } from "typeorm";
import { Appliance } from "../entities/appliance.entity";
import { Project } from "../entities/project.entity";

/**
 * @swagger
 * /projects:
 *   post:
 *     description: Use to create a new project (owned by current user)
 *     produces: ['application/json']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 description: Id of the user who created the project
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: Project title
 *                 example: Office
 *               description:
 *                 type: string
 *                 description: Project description
 *                 example: The main office of X company
 *               score:
 *                 type: number
 *                 description: Project energy class score (from 0 meaning A++, the best energy class to 7 meaning F, the worst energy class)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid Title or UserId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Invalid Title or UserId
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A server error occurred while adding the new project (owned by current user)
 */
export const Create = (req: Request, res: Response) => {
  if (!req.body.title)
    return res.status(400).send({
      message: "Invalid Title",
    });

  if (!req.body.userId)
    return res.status(400).send({
      message: "Invalid Id",
    });

  getRepository(Project)
    .createQueryBuilder()
    .insert()
    .into(Project)
    .values({
      title: req.body.title,
      description: req.body.description,
      user: {
        id: req.body.userId,
      },
    })
    .execute()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "A server error occurred while adding the new project",
      });
    });
};

/**
 * @swagger
 * /projects:
 *   get:
 *     description: Use to get all projects (owned by current user)
 *     produces: ['application/json']
 *     parameters:
 *       - name: title
 *         in: query
 *         required: false
 *         type: string
 *       - name: userId
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid UserId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Invalid UserId
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A server error occurred while retrieving projects (owned by current user)
 */
export const GetAll = (req: Request, res: Response) => {
  const title = req.query.title;
  const userId = req.query.userId;

  if (!req.query.userId)
    return res.status(400).send({ message: "Invalid UserId" });

  const condition: any = title
    ? { title: title, userId: userId }
    : { userId: userId };

  getRepository(Project)
    .find({ where: condition })
    .then((data: Project[]) => {
      res.status(200).send(data);
    })
    .catch((error: Error) => {
      res.status(500).send({
        message:
          error.message || "A server error occurred while retrieving projects",
      });
    });
};

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     description: Use to get a given project (owned by current user)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Could not find given project (owned by current user)
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error occurred while retrieving given project (owned by current user)
 */
export const GetOne = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  getRepository(Project)
    .findOne(id)
    .then((data: Project | undefined) => {
      if (data) {
        res.status(200).send(data);
        next();
      } else {
        res.status(404).send("Could not find project with id=" + id);
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          "Server error occurred while getting project with id=" + id,
      });
    });
};

/**
 * @swagger
 * /projects/{id}/score:
 *   get:
 *     description: Use to get the score of a given project (owned by current user)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projectScore:
 *                   type: number
 *                   description: Project energy class score (from 0 meaning A++, the best energy class to 7 meaning F, the worst energy class)
 *                   example: 1
 *       404:
 *         description: Project not found (score)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Could not find given project (owned by current user) in order to retrieve energy class score
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error occurred while retrieving given project score (owned by current user)
 */
export const GetScore = (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params.id);

  getRepository(Project)
    .find({ where: { userId: req.userId } })
    .then((projects: Project[]) => {
      const isProjectOwnedByUser = projects.some(
        (p: Project) => p.id === projectId
      );
      if (isProjectOwnedByUser) {
        getRepository(Appliance)
          .find({ where: { projectId: projectId } })
          .then((appliances: Appliance[]) => {
            if (appliances?.length === 0)
              return res.status(400).send({
                message: `Error while calculating project's energy class score, project with id=${projectId} does not contain any appliances`,
              });

            const appliancesEnergyClasses: number[] = appliances.map(
              (appliance: Appliance) => appliance.energyClass
            );

            const getMedian = (arr: number[]) => {
              const middle = Math.floor(arr.length / 2);
              arr = [...arr].sort((a, b) => a - b);
              return arr.length % 2 !== 0
                ? arr[middle]
                : (arr[middle - 1] + arr[middle]) / 2;
            };

            const projectScore = getMedian(appliancesEnergyClasses);

            if (projectScore) {
              res.status(200).send({ projectScore });
            }
          })
          .catch((err: Error) => {
            res.status(500).send({
              message:
                err.message ||
                "Server error occurred while retrieving project score",
            });
          });
      } else {
        res.status(404).send({
          message: "Could not find project with id=" + projectId,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          "Server error occurred while verifying project ownership (for project score)",
      });
    });
};

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     description: Use to update a given project (owned by current user)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Project title
 *                 example: Office
 *               description:
 *                 type: string
 *                 description: Project description
 *                 example: The main office of X company
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Project updated successfully
 *       400:
 *         description: Invalid request body or project id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Could not update given project (owned by current user) (project not found or request body was empty)
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Could not find given project (owned by current user)
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error while updating project
 */
export const Update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!req.body)
    return res.status(400).send({
      message: "Invalid project body",
    });

  const project = await getRepository(Project).findOne({
    where: { id: id, userId: req.userId },
  });

  if (!project)
    return res.status(404).send({
      message: "Could not find project with id=" + id,
    });

  getRepository(Project)
    .update(id, req.body)
    .then((result: UpdateResult) => {
      if (result.affected === 1) {
        res.status(200).send({
          message: "Project updated successfully",
        });
      } else {
        res.status(400).send({
          message: `Could not update project with id=${id} (project not found)`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Server error while updating project with id=" + id,
      });
    });
};

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     description: Use to delete a given project (owned by current user)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Project deleted successfully
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Could not delete given project (owned by current user) (project not found)
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error while deleting project (owned by current user)
 */
export const Delete = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const project = await getRepository(Project).findOne({
    where: { id: id, userId: req.userId },
  });

  if (!project)
    return res.status(404).send({
      message: "Could not find project with id=" + id,
    });

  getRepository(Project)
    .delete(id)
    .then((result: DeleteResult) => {
      if (result.affected === 1) {
        res.status(200).send({
          message: "Project deleted successfully",
        });
      } else {
        res.status(404).send({
          message: `Could not delete project with id=${id} (project not found)`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Server error while deleting project with id=" + id,
      });
    });
};
