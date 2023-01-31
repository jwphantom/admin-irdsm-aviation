import { Component, OnInit } from '@angular/core';
import { LoadScript } from 'src/app/services/loadScript.service';
import { Title } from '@angular/platform-browser';
import { SubmissionService } from 'src/app/services/submission.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { Observable, Subscription, take } from 'rxjs';
import { Submission } from 'src/app/models/submission';


import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartService } from 'src/app/services/chart.service';
import { DayService } from 'src/app/services/day.service';
import { LastSubscriptionService } from 'src/app/services/last-subscription.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  constructor(public loadScript: LoadScript,
    private title: Title,
    private submission: SubmissionService,
    private chart: ChartService,
    private day: DayService,
    private lastSubscription: LastSubscriptionService,
    private programs: ProgramsService) { }

  selectConcours: any;

  submissionSubscription: Subscription | undefined

  sub: Submission[] = []

  subAll: Submission[] = []

  sexeLength: Submission[] = []
  sexeLengthSub: Subscription | undefined

  listConcours: any[] | undefined

  // sexe chart
  public sexPieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public sexPieChartLabels = ['Homme', 'Femme'];
  public sexPieChartDatasets: any[] = [];
  public sexPieChartLegend = true;
  public sexPieChartPlugins = [];


  // city chart
  public centerPieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public centerPieChartLabels = ['Yaoundé', 'Douala'];
  public centerPieChartDatasets: any[] = [];
  public centerPieChartLegend = true;
  public centerPieChartPlugins = [];



  //Days subscription

  public today = new Date();

  public sevenLastDay: any[] = []
  public sevenLastDaySubscription: Subscription | undefined


  //seven last subscroiption
  public SubscriptionByDay: any[] = []
  public SubscriptionByDaySubscription: Subscription | undefined


  public lineChartData: ChartConfiguration<'line'>['data'] | undefined
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartPlugins = [];

  public lineChartLegend = true;




  async ngOnInit(): Promise<any> {
    this.title.setTitle("IRDSM AVIATION - Statistics");

    this.listConcours = this.programs.listConcours

    this.selectConcours = this.listConcours?.[this.listConcours.length - 1].name

    this.storeAdmission()

    this.storeSevenLastDay()

    this.submission.getList(this.selectConcours);

    this.loadScript.loadJS();
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

  storeAdmission() {

    this.submissionSubscription = this.submission.submissionSubject.subscribe(
      (submission: Submission[]) => {

        this.subAll = submission;

        this.storeLastSubscription(submission)

        this.sexPieChartDatasets = [{
          data: [this.sexeLengthFilter("M", submission).length, this.sexeLengthFilter("F", submission).length],
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

        this.centerPieChartDatasets = [{
          data: [this.centerLengthFilter("Yaoundé - Mballa 2", submission).length, this.centerLengthFilter("Douala - Immeuble Dekage", submission).length],
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

        this.lineChartData = {
          labels: this.sevenLastDay,
          datasets: [
            {
              data: this.SubscriptionByDay,
              pointBackgroundColor: 'red',
              borderColor: 'blue',
              label: 'Souscriptions'

            }
          ]
        };

      }
    );
    //this.submission.emitsubmission();
  }

  changeDateconcours(date: String) {
    this.submission.getList(date);
  }

  clone(data: any) {
    return JSON.parse(JSON.stringify(data));
  };

  sexeLengthFilter(sexe: string, data: any[]) {
    return this.clone(data).filter((d: { sexe: string }) => d.sexe === sexe);
  };

  centerLengthFilter(center: string, data: any[]) {
    return this.clone(data).filter((d: { center: string }) => d.center === center);
  };

}
