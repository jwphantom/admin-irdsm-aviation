import { Component, OnInit } from '@angular/core';
import { LoadScript } from 'src/app/services/script/loadScript.service';
import { Title } from '@angular/platform-browser';
import { SubmissionService } from 'src/app/services/submission/submission.service';
import { ProgramsService } from 'src/app/services/submission/programs.service';
import { Observable, Subscription, take } from 'rxjs';
import { Submission } from 'src/app/models/submission';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import { Competition } from 'src/app/models/competition';

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
    public competitionService: CompetitionService) { }

  selectConcours: any;

  submissionSubscription: Subscription | undefined

  sub: Submission[] = []

  subAll: Submission[] = []

  sexeLength: Submission[] = []
  sexeLengthSub: Subscription | undefined

  listConcours: any[] | undefined

  loader: Boolean = true

  competition: Competition[] = []
  competitionSuscription: Subscription | undefined




  ngOnInit() {
    this.title.setTitle("IRDSM AVIATION - Statistics");

    this.listConcours = this.programs.listConcours

    this.selectConcours = this.listConcours?.[this.listConcours.length - 1].name

    this.storeAdmission()

    this.storeCompetition()

    this.submission.getList(this.selectConcours);

    this.loadScript.loadJS();
  }


  storeAdmission() {

    this.submissionSubscription = this.submission.submissionSubject.subscribe(
      (submission: Submission[]) => {
        this.subAll = submission;
      }
    );
  }

  storeCompetition() {
    this.competitionService.getList()
    this.competitionSuscription = this.competitionService.competitionSubject.subscribe(
      (competition: Competition[]) => {
        this.competition = competition;
        this.listConcours = this.competition
        this.submission.getList(this.listConcours?.[this.listConcours.length - 1].name);
        this.selectConcours = this.listConcours?.[this.listConcours.length - 1].name

      }
    );
  }

  changeDateconcours(date: String) {
    this.submission.getList(date);
  }

}
