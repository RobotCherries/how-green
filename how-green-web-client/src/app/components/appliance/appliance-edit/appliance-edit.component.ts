import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplianceService } from 'src/app/services/appliance.service';
import { EnergyClassEnum } from 'src/app/shared/enums/energy-class.enum';
import { IAppliance } from 'src/app/shared/interfaces/appliance.interface';
import { IFormOption } from 'src/app/shared/interfaces/form-option.interface';
import { EnergyClassFormOptions } from 'src/app/shared/maps/energy-class.map';

@Component({
  selector: 'hg-appliance-edit',
  templateUrl: './appliance-edit.component.html',
  styleUrls: ['./appliance-edit.component.scss']
})
export class ApplianceEditComponent implements OnInit {
  appliance: IAppliance = {
    name: '',
    description: '',
    energyClass: null,
    energyConsumptionPerYear: null,
    wattage: null,
    projectId: null,
  };
  readonly originalAppliance: IAppliance = {
    name: '',
    description: '',
    energyClass: null,
    energyConsumptionPerYear: null,
    wattage: null,
    projectId: null,
  };
  energyClassOptions: IFormOption<EnergyClassEnum, string>[] = EnergyClassFormOptions;
  routeProjectId: number;
  routeApplianceId: number;
  applianceStatus: { type: string, message: string } = { type: '', message: '' };

  isFormSubmitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private applianceService: ApplianceService,
  ) {}

  ngOnInit(): void {
    console.log('OI EnergyClassEnum', EnergyClassEnum.A);
    this.applianceStatus.message = '';
    this.getRouteProjectId()
    this.getRouteApplianceId()
    this.getAppliance(this.routeProjectId, this.routeApplianceId);
  }

  getRouteProjectId(): void {
    this.routeProjectId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  getRouteApplianceId(): void {
    this.routeApplianceId = parseInt(this.route.snapshot.paramMap.get('applianceId'));
  }

  getAppliance(projectId: number, id: number): void {
    this.applianceService.getOne(projectId, id).subscribe({
      next: (data: IAppliance) => {
        this.appliance = data;

        Object.assign(this.originalAppliance, data);
        // this.originalAppliance.name = data.name;
        // this.originalAppliance.description = data.description;
        // this.originalAppliance.energyClass = data.energyClass;
        // this.originalAppliance.energyConsumptionPerYear = data.energyConsumptionPerYear;
        // this.originalAppliance.wattage = data.wattage;
        // this.originalAppliance.projectId = data.projectId;
        console.log(data);
      },
      error: (error) => {
        this.applianceStatus.type = 'danger';
        this.applianceStatus.message = error.error.message;
        console.log(error);
      },
    });
  }

  save(applianceForm): void {
    if(applianceForm.valid) {
      const data: IAppliance = {
        name: this.appliance.name,
        description: this.appliance.description,
        energyClass: this.appliance.energyClass,
        energyConsumptionPerYear: this.appliance.energyConsumptionPerYear,
        wattage: this.appliance.wattage,
        projectId: this.appliance.projectId
      };

      this.applianceService.update(this.routeProjectId, this.routeApplianceId, data).subscribe({
        next: (response) => {
          this.applianceStatus.type = 'success';
          this.applianceStatus.message = 'The appliance was updated successfully!';
          this.isFormSubmitted = true;
        },
        error: (error) => {
          this.applianceStatus.type = 'danger';
          this.applianceStatus.message = error.error.message;
        },
      });
    } else {
      this.applianceStatus.type = 'warning';
      this.applianceStatus.message = 'Please fill all the * required fields!';
    }
  }

  updateAgain(): void {
    this.isFormSubmitted = false;
    this.appliance = {
      name: null,
      description: null,
      energyClass: null,
      energyConsumptionPerYear: null,
      wattage: null,
      projectId: this.routeProjectId
    };
  }

  goBack(): void {
    this.router.navigate(['/projects/' + this.routeProjectId]);
  }
}
