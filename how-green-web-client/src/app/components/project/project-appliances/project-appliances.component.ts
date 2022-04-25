import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAppliance } from 'src/app/shared/interfaces/appliance.interface';

@Component({
  selector: 'hg-project-appliances',
  templateUrl: './project-appliances.component.html',
  styleUrls: ['./project-appliances.component.scss']
})
export class ProjectAppliancesComponent {
  @Input() projectId: number;
  @Input() projectAppliances: IAppliance[];

  @Output() delete: EventEmitter<number> = new EventEmitter();

  constructor() { }

  deleteAppliance(id: number): void {
    this.delete.emit(id);
  }
}
