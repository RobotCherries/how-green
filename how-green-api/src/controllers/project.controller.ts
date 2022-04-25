import { Request, Response } from "express";
import { DeleteResult, getRepository, UpdateResult } from "typeorm";
import { Appliance } from "../entities/appliance.entity";
import { Project } from "../entities/project.entity";

export const Create = (req: Request, res: Response) => {
  if (!req.body.title || !req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  getRepository(Project)
    .createQueryBuilder()
    .insert()
    .into(Project)
    .values({
      title: req.body.title,
      description: req.body.description,
      score: req.body.score ? req.body.score : "",
      user: {
        id: req.body.userId,
      },
    })
    .execute()
    .then((data) => {
      res.status(201).send(data);
      console.log("Project added successfully!");
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the new project.",
      });
    });
};

export const GetAll = (req: Request, res: Response) => {
  const title = req.query.title;
  const userId = req.query.userId;

  const condition = title
    ? { title: title, userId: userId }
    : { userId: userId };

  getRepository(Project)
    .find({ where: condition })
    .then((data: Project[]) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
      });
    });
};

export const GetOne = (req: Request, res: Response) => {
  const id = req.params.id;

  getRepository(Project)
    .findOne(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error retrieving Project with id=" + id,
      });
    });
};

export const GetScore = (req: Request, res: Response) => {
  const projectId = req.params.id;

  getRepository(Appliance)
    .find({ where: { project: { id: projectId } } })
    .then((data: Appliance[]) => {

      const appliancesEnergyClasses: number[] = data.map(
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

      res.status(200).send({ projectScore });
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appliances.",
      });
    });
};

export const Update = (req: Request, res: Response) => {
  const id = req.params.id;

  getRepository(Project)
    .update(id, req.body)
    .then((result: UpdateResult) => {
      if (result.affected === 1) {
        res.send({
          message: "Project was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error updating Project with id=" + id,
      });
    });
};

export const Delete = (req: Request, res: Response) => {
  const id = req.params.id;

  getRepository(Project)
    .delete(id)
    .then((result: DeleteResult) => {
      if (result.affected === 1) {
        res.send({
          message: "Project was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id,
      });
    });
};
