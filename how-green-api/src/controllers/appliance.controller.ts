import { Request, Response } from "express";
import {
  DeleteResult,
  getRepository,
  InsertResult,
  UpdateResult
} from "typeorm";
import { Appliance } from "../entities/appliance.entity";
import { Project } from "./../entities/project.entity";

/**
 * @swagger
 * /projects/{id}/appliances:
 *   post:
 *     description: Use to add a new appliance to a given project (owned by current user)
 *     produces: ['application/json']
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
 *               name:
 *                 type: string
 *                 description: Appliance name
 *                 example: Coffee Maker
 *               description:
 *                 type: string
 *                 description: Appliance description
 *                 example: Bosch coffee maker
 *               energyClass:
 *                 type: number
 *                 description: Project energy class score (from 0 meaning A++, the best energy class to 7 meaning F, the worst energy class)
 *                 example: 1
 *               energyConsumptionPerYear:
 *                 type: number
 *                 description: Appliance energy consumption per year (kWh/year)
 *                 example: 125
 *               wattage:
 *                 type: number
 *                 description: Appliance wattage
 *                 example: 900
 *     responses:
 *       201:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Appliance added successfully
 *       400:
 *         description: Invalid projectId, appliance name or energy class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Invalid projectId, appliance name or energy class
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error occurred while adding new appliance to given project
 */
export const Create = (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params.id);
  console.log(req.params.id);

  if (!req.params.id)
    return res.status(400).send({
      message: "Invalid project id",
    });

  if (!req.body.name)
    return res.status(400).send({
      message: "Empty appliance name",
    });

  if (req.body.energyClass == null || req.body.energyClass === "")
    return res.status(400).send({
      message: "Empty energy class",
    });

  getRepository(Appliance)
    .createQueryBuilder()
    .insert()
    .into(Appliance)
    .values({
      name: req.body.name,
      description: req.body.description,
      energyClass: req.body.energyClass,
      energyConsumptionPerYear: req.body.energyConsumptionPerYear,
      wattage: req.body.wattage,
      project: {
        id: projectId,
      },
    })
    .execute()
    .then((result: InsertResult) => {
      res.status(201).send(result);
      console.log("Appliance added successfully");
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          "Server error occurred while adding new appliance to project with id=" +
            projectId,
      });
    });
};

/**
 * @swagger
 * /projects/{id}/appliances:
 *   get:
 *     description: Use to get all appliances from a given project (owned by current user)
 *     produces: ['application/json']
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appliance'
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
 *                   description: A server error occurred while retrieving appliances for given project (owned by current user)
 */
export const GetAll = async (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params.id);

  const project = await getRepository(Project).findOne({
    where: { id: projectId, userId: req.userId },
  });

  if (!project)
    return res.status(404).send({
      message: "Could not find project with id=" + projectId,
    });

  getRepository(Appliance)
    .createQueryBuilder()
    .where("projectId = :projectId", { projectId: projectId })
    .getMany()
    .then((appliances: Appliance[]) => {
      res.status(200).send(appliances);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          `Server error occurred while retrieving appliances for project with id=${projectId}`,
      });
    });
};

/**
 * @swagger
 * /projects/{id}/appliances/{applianceId}:
 *   get:
 *     description: Use to get a given appliance from a given project (owned by current user)
 *     produces: ['application/json']
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *       - name: applianceId
 *         in: path
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
 *                 $ref: '#/components/schemas/Appliance'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Could not find given appliance or project (owned by current user)
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A server error occurred while retrieving given appliance from given project (owned by current user)
 */
export const GetOne = async (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params.id);
  const applianceId: number = parseInt(req.params.applianceId);

  const project = await getRepository(Project).findOne({
    where: { id: projectId, userId: req.userId },
  });

  if (!project)
    return res.status(404).send({
      message: "Could not find project with id=" + projectId,
    });

  getRepository(Appliance)
    .createQueryBuilder()
    .where("projectId = :projectId", { projectId: projectId })
    .andWhere("id = :id", { id: applianceId })
    .getOne()
    .then((data: Appliance | undefined) => {
      if (!data)
        return res.status(404).send({
          message: `Could not find appliance with id=${applianceId} from project with id=${projectId}`,
        });

      res.status(200).send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          `Server error while retrieving appliance with id=${applianceId} from project with id=${projectId}`,
      });
    });
};

/**
 * @swagger
 * /projects/{id}/appliances/{applianceId}:
 *   put:
 *     description: Use to update a given appliance from a given project (owned by current user)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *       - name: applianceId
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
 *               name:
 *                 type: string
 *                 description: Appliance name
 *                 example: (Updated) Coffee Maker
 *               description:
 *                 type: string
 *                 description: Appliance description
 *                 example: (Updated) Bosch coffee maker
 *               energyClass:
 *                 type: number
 *                 description: Appliance energy class (from 0 meaning A++, the best energy class to 7 meaning F, the worst energy class)
 *                 example: 2
 *               energyConsumptionPerYear:
 *                 type: number
 *                 description: Appliance energy consumption per year (kWh/year)
 *                 example: 125
 *               wattage:
 *                 type: number
 *                 description: Appliance wattage
 *                 example: 900
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
 *         description: Empty request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Could not update project with id=${id} (request body was empty)
 *       404:
 *         description: Project or appliance not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Could not find given appliance or project (owned by current user)
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error while updating given appliance from given project (owned by user)
 */
export const Update = async (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params.id);
  const applianceId: number = parseInt(req.params.applianceId);

  if (!req.body) return res.status(400).send("Empty request body");

  const project = await getRepository(Project).findOne({
    where: { id: projectId, userId: req.userId },
  });
  if (!project)
    return res.status(404).send({
      message: "Could not find project with id=" + projectId,
    });

  getRepository(Appliance)
    .update(applianceId, req.body)
    .then((result: UpdateResult) => {
      if (result.affected === 1) {
        res.status(200).send({
          message: "Appliance updated successfully",
        });
      } else {
        res.status(404).send({
          message: `Cannot update appliance with id=${applianceId} from project with id=${projectId} (appliance not found)`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          `Server error occurred while updating appliance with id=${applianceId} from project with id=${projectId}`,
      });
    });
};

/**
 * @swagger
 * /projects/{id}/appliances/{applianceId}:
 *   delete:
 *     description: Use to delete a given appliance from a given project (owned by current user)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *       - name: applianceId
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
 *                   description: Appliance deleted successfully
 *       404:
 *         description: Project or appliance not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Could not delete given appliance from given project (project or appliance not found)
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error while deleting project
 */
export const Delete = async (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params.id);
  const applianceId: number = parseInt(req.params.applianceId);

  const project = await getRepository(Project).findOne({
    where: { id: projectId, userId: req.userId },
  });

  if (!project)
    return res.status(404).send({
      message: "Could not find project with id=" + projectId,
    });

  getRepository(Appliance)
    .delete(applianceId)
    .then((result: DeleteResult) => {
      if (result.affected === 1) {
        res.status(200).send({
          message: "Appliance deleted successfully",
        });
      } else {
        res.status(404).send({
          message: `Could not delete appliance with id=${applianceId} from project with id=${projectId} (appliance not found)`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          `Server error while deleting appliance with id=${applianceId} from project with id=${projectId}`,
      });
    });
};
