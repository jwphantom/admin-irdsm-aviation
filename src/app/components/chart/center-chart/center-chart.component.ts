import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { CenterChartService } from 'src/app/services/center-chart.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-center-chart',
  templateUrl: './center-chart.component.html',
  styleUrls: ['./center-chart.component.scss']
})
export class CenterChartComponent {

  //data des submission passé en paramètre
  @Input() sub: any[] = []


  // city chart
  public centerPieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public centerPieChartLabels = ['Yaoundé', 'Douala'];
  public centerPieChartDatasets: any[] = [];
  public centerPieChartLegend = true;
  public centerPieChartPlugins = [];

  constructor(
    private centerChartService: CenterChartService) { }


  ngOnChanges() {
    this.loadChart()
  }

  loadChart() {
    this.centerPieChartDatasets = [{
      data: [this.centerChartService.centerLengthFilter("Yaoundé - Mballa 2", this.sub).length, this.centerChartService.centerLengthFilter("Douala - Immeuble Dekage", this.sub).length],
      backgroundColor: [
        '#00763B',
        '#F6A003'
      ],
      hoverBackgroundColor: [
        '#00763B',
        '#F6A003'
      ],
      hoverBorderColor: [
        '#00763B',
        '#F6A003'
      ],

    }]
  }

}
