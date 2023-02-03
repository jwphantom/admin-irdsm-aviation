import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { Submission } from 'src/app/models/submission';
import { DayService } from 'src/app/services/chart/day.service';
import { LastSubscriptionService } from 'src/app/services/chart/last-subscription.service';

@Component({
  selector: 'app-last-submission-chart',
  templateUrl: './last-submission-chart.component.html',
  styleUrls: ['./last-submission-chart.component.scss']
})
export class LastSubmissionChartComponent {

  //data des submission passé en paramètre
  @Input() sub: any[] = []

  //seven last subscroiption
  public SubscriptionByDay: any[] = []
  public SubscriptionByDaySubscription: Subscription | undefined

  public lineChartData: ChartConfiguration<'line'>['data'] | undefined
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartPlugins = [];

  public lineChartLegend = true;

  //Days subscription

  public today = new Date();

  public sevenLastDay: any[] = []
  public sevenLastDaySubscription: Subscription | undefined


  constructor(
    private day: DayService,
    private lastSubscription: LastSubscriptionService) { }

  ngOnChanges() {
    this.storeSevenLastDay()
    this.loadChart()
  }

  storeSevenLastDay() {
    this.day.setSeventLastDay()
    this.sevenLastDaySubscription = this.day.sevenLastDaySubject.subscribe(
      (sevenLastDay: Submission[]) => {
        this.sevenLastDay = sevenLastDay;
      }
    );
    this.day.emitSevenLastDay();
  }

  async storeLastSubscription(subs: any) {
    this.lastSubscription.setCountSubscriptionByDay(subs)
    this.SubscriptionByDaySubscription = this.lastSubscription.countSubscriptionByDaysubject.subscribe(
      (countSubscriptionByDay: Submission[]) => {
        this.SubscriptionByDay = countSubscriptionByDay;
      }
    );
    this.lastSubscription.emitcountSubscriptionByDay();
  }

  loadChart() {
    this.storeLastSubscription(this.sub)

    this.lineChartData = {
      labels: this.sevenLastDay,
      datasets: [
        {
          data: this.SubscriptionByDay,
          pointBackgroundColor: 'red',
          borderColor: 'blue', label: 'Souscriptions'

        }
      ]
    };
  }


}
