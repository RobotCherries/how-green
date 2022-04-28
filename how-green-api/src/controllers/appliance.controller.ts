import { Request, Response } from "express";
import { DeleteResult, getRepository, UpdateResult } from "typeorm";
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

  if (
    req.body.energyClass === null ||
    req.body.energyClass === "" ||
    req.body.energyClass === undefined
  ) {
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
      // console.log("res data", data);
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appliances.",
      });
    });
};

export const GetOne = (req: Request, res: Response) => {
  const projectId = JSON.parse(req.params.id);
  const applianceId = JSON.parse(req.params.applianceId);

  getRepository(Appliance)
    .findOne(applianceId)
    .then((data: Appliance | undefined) => {

      if(data?.projectId !== projectId) {
        res.status(401).send("You are only allowed to view appliances from your projects.")
        return;
      }

      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error retrieving Appliance with id=" + applianceId,
      });
    });
};

export const Update = (req: Request, res: Response) => {
  const projectId = JSON.parse(req.params.id);
  const applianceId = JSON.parse(req.params.applianceId);

  console.log(projectId, req.body);

  if(req.body.projectId !== projectId) {
    res.status(401).send("You are only allowed to update appliances from your projects.")
    return;
  }

  getRepository(Appliance)
    .update(applianceId, req.body)
    .then((result: UpdateResult) => {
      if (result.affected === 1) {
        res.send({
          message: "Appliance was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Appliance with id=${applianceId}. Maybe Appliance was not found or req.body is empty!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error updating Appliance with id=" + applianceId,
      });
    });
};

export const Delete = (req: Request, res: Response) => {
  const projectId = JSON.parse(req.params.id);
  const applianceId = JSON.parse(req.params.applianceId);

  getRepository(Appliance)
    .delete(applianceId)
    .then((result: DeleteResult) => {
      if (result.affected === 1) {
        res.send({
          message: "Appliance was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Appliance with id=${applianceId}. Maybe Appliance was not found!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Could not delete Appliance with id=" + applianceId,
      });
    });
};
