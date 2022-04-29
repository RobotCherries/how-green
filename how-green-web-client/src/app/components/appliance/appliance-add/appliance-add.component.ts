import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnergyClassEnum } from 'src/app/shared/enums/energy-class.enum';
import { IAppliance } from 'src/app/shared/interfaces/appliance.interface';
import { IFormOption } from 'src/app/shared/interfaces/form-option.interface';
import { EnergyClassFormOptions } from 'src/app/shared/maps/energy-class.map';
import { ApplianceService } from './../../../services/appliance.service';

@Component({
  selector: 'hg-appliance-add',
  templateUrl: './appliance-add.component.html',
  styleUrls: ['./appliance-add.component.scss']
})
export class ApplianceAddComponent implements OnInit {
  appliance: IAppliance = {
    name: '',
    description: '',
    energyClass: null,
    energyConsumptionPerYear: null,
    wattage: null
  };
  energyClassOptions: IFormOption<EnergyClassEnum, string>[] = EnergyClassFormOptions;
  routeProjectId: number;
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
  }

  getRouteProjectId(): void {
    this.routeProjectId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  save(applianceForm): void {
    if(applianceForm.valid) {
      const data: IAppliance = {
        name: this.appliance.name,
        description: this.appliance.description,
        energyClass: this.appliance.energyClass,
        energyConsumptionPerYear: this.appliance.energyConsumptionPerYear,
        wattage: this.appliance.wattage
      };

      this.applianceService.create(this.routeProjectId, data).subscribe({
        next: (response) => {
          this.applianceStatus.type = 'success';
          this.applianceStatus.message = 'The project was created successfully!';
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

  addMore(): void {
    this.isFormSubmitted = false;
    this.appliance = {
      name: null,
      description: null,
      energyClass: null,
      energyConsumptionPerYear: null,
      wattage: null
    };
  }

  goBack(): void {
    this.router.navigate(['/projects/' + this.routeProjectId]);
  }
}
