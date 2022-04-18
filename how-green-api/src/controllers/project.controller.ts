import { Request, Response } from "express";
import { getRepository } from 'typeorm';
import { Project } from '../entities/project.entity';

// Create and Save a new Project
export const Create = (req: Request, res: Response) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Project
  const project = {
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    score: ''
  };

  console.log('project', project);

  // Save Project in the database
  getRepository(Project).save(project)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};

// Retrieve all Projects from the database.
export const FindAll = (req: Request, res: Response) => {
  const title = req.query.title;
  var condition = title ? { title:`%${title}` } : null;

  getRepository(Project).find({ where: title ? { title: title } : {} })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });

  // getRepository(Project)
  //   .createQueryBuilder("project")
  //   // .where("project.title  like '%' || :title || '%'", { title: title })
  //   .getMany();
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

// find all published Project
export const FindAllPublished = (req: Request, res: Response) => {
  getRepository(Project).find({ where: { published: true } })
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
