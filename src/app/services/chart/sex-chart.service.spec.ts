import { TestBed } from '@angular/core/testing';

import { SexChartService } from './sex-chart.service';

describe('SexChartService', () => {
  let service: SexChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SexChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
