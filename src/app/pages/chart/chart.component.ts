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
import { CenterChartService } from 'src/app/services/center-chart.service';
import { SexChartService } from 'src/app/services/sex-chart.service';


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
    private centerChartService: CenterChartService,
    private sexChartService: SexChartService,
    private programs: ProgramsService) { }

  selectConcours: any;

  submissionSubscription: Subscription | undefined

  sub: Submission[] = []

  subAll: Submission[] = []

  sexeLength: Submission[] = []
  sexeLengthSub: Subscription | undefined

  listConcours: any[] | undefined

  loader: Boolean = true



  ngOnInit() {
    this.title.setTitle("IRDSM AVIATION - Statistics");

    this.listConcours = this.programs.listConcours

    this.selectConcours = this.listConcours?.[this.listConcours.length - 1].name

    this.storeAdmission()

    this.submission.getList(this.selectConcours);

    this.loadScript.loadJS();
  }


  storeAdmission() {

    this.submissionSubscription = this.submission.submissionSubject.subscribe(
      (submission: Submission[]) => {
        this.subAll = submission;
        // console.log(this.subAll)

      }
    );
  }

  changeDateconcours(date: String) {
    this.submission.getList(date);
  }

}
