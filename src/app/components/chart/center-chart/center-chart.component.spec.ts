import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterChartComponent } from './center-chart.component';

describe('CenterChartComponent', () => {
  let component: CenterChartComponent;
  let fixture: ComponentFixture<CenterChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
