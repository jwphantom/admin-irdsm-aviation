import { TestBed } from '@angular/core/testing';

import { CenterChartService } from './center-chart.service';

describe('CenterChartService', () => {
  let service: CenterChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CenterChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
