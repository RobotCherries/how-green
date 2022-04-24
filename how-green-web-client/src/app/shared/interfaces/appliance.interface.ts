import { IProject } from './project.interface';

export interface IAppliance {
  id: number;
  project: IProject;
  name: string;
  description: string;
  energyEfficiencyClass: number;
  energyConsumptionPerYear?: number;
  wattage?: number;
  created_at: Date;
}
