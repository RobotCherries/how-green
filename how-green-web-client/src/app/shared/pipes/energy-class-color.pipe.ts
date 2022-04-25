import { Pipe, PipeTransform } from '@angular/core';
import { EnergyClassColorEnum } from '../enums/energy-class-color.enum';

@Pipe({
  name: 'energyClassColor'
})
export class EnergyClassColorPipe implements PipeTransform {

  transform(value: number): string | number {
    const energyClassColorsLength: number = Object.keys(EnergyClassColorEnum).length;

    return value < energyClassColorsLength ? EnergyClassColorEnum[value] : value;
  }

}
