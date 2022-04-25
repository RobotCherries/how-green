import { Pipe, PipeTransform } from '@angular/core';
import { EnergyClassEnum } from '../enums/energy-class.enum';

@Pipe({
  name: 'energyClass'
})
export class EnergyClassPipe implements PipeTransform {

  transform(value: number): string | number {
    const energyClassesLength: number = Object.keys(EnergyClassEnum).length;

    if (value % 1 === 0.5) {
      value += 0.5;
    }

    return value < energyClassesLength ? EnergyClassEnum[value] : value;
  }

}
