import { Request, Response } from "express";
import { getRepository } from 'typeorm';
import { Project } from '../entities/project.entity';

// Create and Save a new Project
export const Create = (req: Request, res: Response) => {
  // Validate request
  if (!req.body.title || !req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!"
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
      score: req.body.score ? req.body.score : '',
      status: req.body.status ? req.body.status : false,
      user: {
        id: req.body.userId
      }
    })
    .execute();
};

// Retrieve all Projects from the database.
export const FindAll = (req: Request, res: Response) => {
  // if (!req.body.userId) {
  //   res.status(400).send({
  //     message: "UserId can not be empty!"
  //   });
  //   return;
  // }

  const title = req.query.title;
  console.log('res', req.query);
  const condition = title ? { title: title, user: req.query.userId } : { user: req.query.userId };

  getRepository(Project).find({ where: condition })
    .then((data: any) => {
      console.log('res data', data);
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};

// Find a single Project with an id
export const FindOne = (req: Request, res: Response) => {
  const id = req.params.id;

  getRepository(Project).findOne(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error retrieving Project with id=" + id
      });
    });
};

// Update a Project by the id in the request
export const Update = (req: Request, res: Response) => {
  const id = req.params.id;

  getRepository(Project).update(id, req.body)
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

// Delete a Project with the specified id in the request
export const Delete = (req: Request, res: Response) => {
  const id = req.params.id;

  getRepository(Project).delete(id)
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

// find all status Project
export const FindAllStatus = (req: Request, res: Response) => {
  getRepository(Project).find({ where: { status: true } })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};
