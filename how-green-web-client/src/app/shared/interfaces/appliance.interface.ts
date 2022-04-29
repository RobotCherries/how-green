
export interface IAppliance {
  id?: number;
  projectId?: number;
  name: string;
  description?: string;
  energyClass: number;
  energyConsumptionPerYear?: number;
  wattage?: number;
  createdAt?: Date;
}
