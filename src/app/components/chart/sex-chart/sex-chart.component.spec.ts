import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexChartComponent } from './sex-chart.component';

describe('SexChartComponent', () => {
  let component: SexChartComponent;
  let fixture: ComponentFixture<SexChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SexChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SexChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
