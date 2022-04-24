import { Component, Input } from '@angular/core';
import { IAppliance } from 'src/app/shared/interfaces/appliance.interface';

@Component({
  selector: 'hg-project-appliances',
  templateUrl: './project-appliances.component.html',
  styleUrls: ['./project-appliances.component.scss']
})
export class ProjectAppliancesComponent {
  @Input() projectAppliances: IAppliance[];

  constructor() { }
}
