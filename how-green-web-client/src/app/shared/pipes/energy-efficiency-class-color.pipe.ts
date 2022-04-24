import { Pipe, PipeTransform } from '@angular/core';
import { EnergyEfficiencyClassColorEnum } from '../enums/energy-efficiency-class-color.enum';

@Pipe({
  name: 'energyEfficiencyClassColor'
})
export class EnergyEfficiencyClassColorPipe implements PipeTransform {

  transform(value: number): string | number {
    const energyEfficiencyClassColorsLength: number = Object.keys(EnergyEfficiencyClassColorEnum).length;

    return value < energyEfficiencyClassColorsLength ? EnergyEfficiencyClassColorEnum[value] : value;
  }

}
