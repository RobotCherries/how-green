import { Pipe, PipeTransform } from '@angular/core';
import { EnergyEfficiencyClassEnum } from '../enums/energy-efficiency-class.enum';

@Pipe({
  name: 'energyEfficiencyClass'
})
export class EnergyEfficiencyClassPipe implements PipeTransform {

  transform(value: number): string | number {
    const energyEfficiencyClassesLength: number = Object.keys(EnergyEfficiencyClassEnum).length;
    console.log('EnergyEfficiencyClassEnum', value);

    return value < energyEfficiencyClassesLength ? EnergyEfficiencyClassEnum[value] : value;
  }

}
