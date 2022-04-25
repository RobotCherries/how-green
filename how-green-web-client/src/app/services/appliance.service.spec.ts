/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplianceService } from './appliance.service';

describe('Service: Appliance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplianceService]
    });
  });

  it('should ...', inject([ApplianceService], (service: ApplianceService) => {
    expect(service).toBeTruthy();
  }));
});
