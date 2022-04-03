import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '../pages/common/global-constants';
import { Submission } from '../models/submission'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  submission: Submission[] = [];
  submissionSubject = new Subject<Submission[]>();


  constructor(protected http: HttpClient,
    private router: Router) { }

  emitsubmission() {
    this.submissionSubject.next(this.submission);
  }


  async getList(dateC: string) {

    this.http
      .get<any[]>(`${GlobalConstants.apiURL}/submission/list/${dateC}`)
      .subscribe(
        (response) => {
          this.submission = response;
          this.emitsubmission();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }

  async checkCall(dateC: string) {

    this.http
      .get<any[]>(`${GlobalConstants.apiURL}/submission/list/${dateC}`)
      .subscribe(
        (response) => {
          this.submission = response;
          this.emitsubmission();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }
}
