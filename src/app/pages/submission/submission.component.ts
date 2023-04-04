import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Submission } from 'src/app/models/submission';
import { SubmissionService } from 'src/app/services/submission/submission.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProgramsService } from 'src/app/services/submission/programs.service';

import { DatePipe } from '@angular/common';

import { ExportService } from 'src/app/services/submission/export.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { LoadScript } from 'src/app/services/script/loadScript.service';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition/competition.service';


const EXCEL_EXTENSION = '.xlsx';

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { PdfService } from 'src/app/services/pdf/pdf.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  competition: Competition[] = []
  competitionSuscription: Subscription | undefined


  sub: Submission[] = []
  subAll: Submission[] = []

  loader: Boolean = true

  submissionSubscription: Subscription | undefined

  selectConcours: any;

  listConcours: any[] | undefined

  rangeDataForm!: FormGroup

  lastMaximum: number = Number(localStorage.getItem('maximum')) | 0

  @Input() minData: number = 1

  @Input() maxData: number = 1

  @Input() compteur: number = 1

  public overMax: Boolean = false

  public overMin: Boolean = false

  /* the table reference */
  @ViewChild('submissionTable') submissionTable!: ElementRef;

  displayedColumns: string[] = [];

  dataSource: any


  constructor(
    private title: Title,
    private submission: SubmissionService,
    private programs: ProgramsService,
    private datePipe: DatePipe,
    private exportService: ExportService,
    private formBuilder: FormBuilder,
    public loadScript: LoadScript,
    public competitionService: CompetitionService,
    public pdfService: PdfService


  ) { }


  ngOnInit() {

    this.title.setTitle("IRDSM AVIATION - Réponses au formulaire");

    this.storeAdmission()

    this.storeCompetition()

    this.loadScript.loadJS();

    this.displayedColumns = ['no', 'fname', 'phone', 'email', 'sexe', 'age', 'ville', 'programs', 'diplome', 'center'];

    this.dataSource = new MatTableDataSource<Submission>([]);

  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  storeAdmission() {
    this.submissionSubscription = this.submission.submissionSubject.subscribe(
      (submission: Submission[]) => {
        this.sub = submission;
        this.subAll = submission
        this.addRangeForm(submission.length)
        this.dataSource = new MatTableDataSource<Submission>(submission);
        this.dataSource.paginator = this.paginator;

        if (Object.keys(this.sub).length === 0) {
          $('#loader').show()
          $('#submissionTable').hide()

        } else {
          $('#submissionTable').show()
          $('#loader').hide()
        }

      }
    );
    this.submission.emitsubmission();
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

  addRangeForm(max: number) {
    this.rangeDataForm = this.formBuilder.group({
      min: [this.lastMaximum, [Validators.required, Validators.max(max)]],
      max: [max, [Validators.required, Validators.max(max), Validators.min(this.minData)]],
    });
  }

  cloneSubmission(submission: any) {
    return JSON.parse(JSON.stringify(submission))
  }

  submitRange() {
    let mininum = this.rangeDataForm.get('min')?.value
    let maximum = this.rangeDataForm.get('max')?.value

    localStorage.setItem('maximum', JSON.stringify(maximum))

    let current_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    let copy_submission = this.cloneSubmission(this.subAll);

    let submission = JSON.parse(JSON.stringify(copy_submission.slice((mininum - 1), (maximum))))

    this.sub = submission;
    this.compteur = mininum;
    setTimeout(() => {
      //this.exportService.exportTableElmToExcel(this.submissionTable, 'Réponses aux formulaire-' + current_date);
      this.pdfService.generatePdf(this.sub, current_date)
    }, 2000)

  }

  changeMinData(min: Event, ReelMax: Number) {
    this.overMin = this.submission.changeMinData(min, ReelMax)
  }

  changeMaxData(max: Event, ReelMax: Number) {
    this.overMax = this.submission.changeMinData(max, ReelMax)
  }

}
