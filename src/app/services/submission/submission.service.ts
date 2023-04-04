import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '../../common/global-constants';
import { Submission } from '../../models/submission'
import { Subject } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  public overMax: Boolean = false

  public overMin: Boolean = false

  submission: Submission[] = [];
  submissionSubject = new Subject<Submission[]>();


  constructor(protected http: HttpClient,
    private router: Router,
    private token: TokenService) { }

  emitsubmission() {
    this.submissionSubject.next(this.submission);
  }


  async getList(dateC: String) {
    this.http
      .get<any[]>(`${GlobalConstants.apiURL}/submission/list/${dateC}`, this.token.getHeader())
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
      .get<any[]>(`${GlobalConstants.apiURL}/submission/list/${dateC}`, this.token.getHeader())
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

  changeMinData(min: Event, ReelMax: Number): Boolean {
    if (ReelMax == 0) ReelMax = 1
    if (Number(min) > Number(ReelMax) || Number(min) < 0) {
      return true
    }

    return false



  }

  changeMaxData(max: Event, ReelMax: Number, minData: Number): Boolean {
    if (ReelMax == 0) { ReelMax = 1 }

    if (Number(max) > Number(ReelMax) || Number(max) < Number(minData)) {
      return true
    }
    return false

  }

}
