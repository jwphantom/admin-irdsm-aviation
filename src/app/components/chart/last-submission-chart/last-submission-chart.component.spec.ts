import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSubmissionChartComponent } from './last-submission-chart.component';

describe('LastSubmissionChartComponent', () => {
  let component: LastSubmissionChartComponent;
  let fixture: ComponentFixture<LastSubmissionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastSubmissionChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastSubmissionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
