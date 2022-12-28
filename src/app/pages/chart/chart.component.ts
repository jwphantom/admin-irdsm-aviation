import { Component, OnInit } from '@angular/core';
import { LoadScript } from 'src/app/services/loadScript.service';
import { Title } from '@angular/platform-browser';
import { SubmissionService } from 'src/app/services/submission.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { ExportService } from 'src/app/services/export.service';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription, take } from 'rxjs';
import { Submission } from 'src/app/models/submission';


import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartService } from 'src/app/services/chart.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  constructor(public loadScript: LoadScript,
    private title: Title,
    private submission: SubmissionService,
    private programs: ProgramsService,
    private auth: AuthService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private chartService: ChartService) { }

  selectConcours: any;

  submissionSubscription: Subscription | undefined

  sub: Submission[] = []

  subAll: Submission[] = []

  sexeLength: Submission[] = []
  sexeLengthSub: Subscription | undefined

  listConcours: any[] | undefined

  // sexe chart
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels = ['Homme', 'Femme'];
  public pieChartDatasets: any[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];



  //Days subscription

  public today = new Date();

  public sevenLastDay: any[] = []


  public lineChartData: ChartConfiguration<'bar'>['data'] | undefined
  public lineChartOptions: ChartOptions<'bar'> = {
    responsive: true
  };
  public lineChartPlugins = [];

  public lineChartLegend = true;

  async ngOnInit(): Promise<any> {
    this.title.setTitle("IRDSM AVIATION - Statistics");

    this.listConcours = this.programs.listConcours

    this.selectConcours = this.listConcours?.[this.listConcours.length - 1].name

    this.storeAdmission()

    this.setSeventLastDay()

    this.submission.getList(this.listConcours?.[this.listConcours.length - 1].name);

    this.loadScript.loadScript('../assets/js/jquery.js');

    this.loadScript.loadScript('../assets/js/plugins.js');

    this.loadScript.loadScript('../assets/js/functions.js');

    this.loadScript.loadScript('../assets/js/form.js');
  }

  storeAdmission() {

    //this.submission.getList(this.selectConcours);
    this.submissionSubscription = this.submission.submissionSubject.subscribe(
      (submission: Submission[]) => {
        this.subAll = submission;
        this.pieChartDatasets = [{
          data: [this.sexeLengthFilter("M", submission).length, this.sexeLengthFilter("F", submission).length]
        }]

        this.lineChartData = {
          labels: this.sevenLastDay,
          datasets: [
            {
              data: [
                this.countSubscriptionByDay(this.convertDateCreationToDate(this.sevenLastDay[6]), submission),
                this.countSubscriptionByDay(this.convertDateCreationToDate(this.sevenLastDay[5]), submission),
                this.countSubscriptionByDay(this.convertDateCreationToDate(this.sevenLastDay[4]), submission),
                this.countSubscriptionByDay(this.convertDateCreationToDate(this.sevenLastDay[3]), submission),
                this.countSubscriptionByDay(this.convertDateCreationToDate(this.sevenLastDay[2]), submission),
                this.countSubscriptionByDay(this.convertDateCreationToDate(this.sevenLastDay[1]), submission),
                this.countSubscriptionByDay(this.convertDateCreationToDate(this.sevenLastDay[0]), submission)], label: 'Souscription'

            }
          ]
        };

      }
    );
    this.submission.emitsubmission();
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

  convertDay(n: number) {
    return n > 9 ? "" + n : "0" + n;
  };

  convertDateCreationToDate(date: any) {
    //const tempDate = new Date(date).toDateString();
    return `${new Date(date).getFullYear()}/${Number(this.convertDay(new Date(date).getMonth())) + 1
      }/${this.convertDay(new Date(date).getDate())}`;
  };

  setSeventLastDay() {
    const week = [];
    for (let i = 6; i >= 0; i--) {
      const tomorrow = new Date();
      tomorrow.setDate(this.today.getDate() - i);
      week.push(this.convertDateCreationToDate(tomorrow));
    }

    this.sevenLastDay = week;
  }

  countSubscriptionByDay(date: string, data: any[]) {
    return this.clone(data).filter(
      (d: { dateCreation: Date }) =>
        this.convertDateCreationToDate(d.dateCreation) === date
    ).length;
  };

}
