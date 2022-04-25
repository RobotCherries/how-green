import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Appliance } from "../entities/appliance.entity";

// Create and Save a new Appliance
export const Create = (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params.id);

  if (!req.params.id) {
    res.status(400).send({
      message: "Project Id must be valid!",
    });
    return;
  }

  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty!",
    });
    return;
  }

  if (req.body.energyClass === null || req.body.energyClass === '' || req.body.energyClass === undefined) {
    res.status(400).send({
      message: "Efficiency Class cannot be empty!",
    });
    return;
  }

  getRepository(Appliance)
    .createQueryBuilder()
    .insert()
    .into(Appliance)
    .values({
      name: req.body.name,
      description: req.body.description,
      energyClass: req.body.energyClass,
      energyConsumptionPerYear: req.body.energyConsumptionPerYear
        ? req.body.energyConsumptionPerYear
        : 0,
      wattage: req.body.wattage ? req.body.wattage : 0,
      project: {
        id: projectId,
      },
    })
    .execute()
    .then((data) => {
      res.status(201).send(data);
      console.log("Appliance added successfully!");
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the new appliance.",
      });
    });
};

export const GetAll = (req: Request, res: Response) => {
  const projectId = req.params.id;

  getRepository(Appliance)
    .find({ where: { project: { id: projectId } } })
    .then((data: any) => {
      console.log("res data", data);
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appliances.",
      });
    });
};
