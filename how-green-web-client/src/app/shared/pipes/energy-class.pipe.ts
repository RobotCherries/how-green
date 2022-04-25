import { Pipe, PipeTransform } from '@angular/core';
import { EnergyClassEnum } from '../enums/energy-class.enum';

@Pipe({
  name: 'energyClass'
})
export class EnergyClassPipe implements PipeTransform {

  transform(value: number): string | number {
    const energyClassesLength: number = Object.keys(EnergyClassEnum).length;
    console.log('EnergyClassEnum', value);

    return value < energyClassesLength ? EnergyClassEnum[value] : value;
  }

}
