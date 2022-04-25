import { EnergyClassEnum } from '../enums/energy-class.enum';
import { IFormOption } from '../interfaces/form-option.interface';

export const EnergyClassMap: Map<EnergyClassEnum, string> = new Map([
  [0, EnergyClassEnum[0]],
  [1, EnergyClassEnum[1]],
  [2, EnergyClassEnum[2]],
  [3, EnergyClassEnum[3]],
  [4, EnergyClassEnum[4]],
  [5, EnergyClassEnum[5]],
  [6, EnergyClassEnum[6]],
  [7, EnergyClassEnum[7]],
]);

export const EnergyClassFormOptions: IFormOption<EnergyClassEnum, string>[] = [
  { value: 0, label: EnergyClassEnum[0] },
  { value: 1, label: EnergyClassEnum[1] },
  { value: 2, label: EnergyClassEnum[2] },
  { value: 3, label: EnergyClassEnum[3] },
  { value: 4, label: EnergyClassEnum[4] },
  { value: 5, label: EnergyClassEnum[5] },
  { value: 6, label: EnergyClassEnum[6] },
  { value: 7, label: EnergyClassEnum[7] },
];
