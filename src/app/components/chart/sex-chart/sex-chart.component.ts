import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { Submission } from 'src/app/models/submission';
import { SexChartService } from 'src/app/services/sex-chart.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-sex-chart',
  templateUrl: './sex-chart.component.html',
  styleUrls: ['./sex-chart.component.scss']
})
export class SexChartComponent {


  //data des submission passé en paramètre
  @Input() sub: any[] = []

  sexeLength: Submission[] = []
  sexeLengthSub: Subscription | undefined


  // sexe chart
  public sexPieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public sexPieChartLabels = ['Homme', 'Femme'];
  public sexPieChartDatasets: any[] = [];
  public sexPieChartLegend = true;
  public sexPieChartPlugins = [];


  constructor(
    private submission: SubmissionService,

    private sexChartService: SexChartService) { }


  ngOnChanges() {
    this.loadChart()
  }

  loadChart() {
    this.sexPieChartDatasets = [{
      data: [this.sexChartService.sexeLengthFilter("M", this.getsubmit()).length, this.sexChartService.sexeLengthFilter("F", this.getsubmit()).length],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      hoverBackgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ], hoverBorderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
    }]
  }

  getsubmit() {
    return this.sub
  }
}
