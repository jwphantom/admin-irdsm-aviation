import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { GlobalConstants } from '../../common/global-constants';
import { Competition } from 'src/app/models/competition';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(protected http: HttpClient,
    private token: TokenService,
    private toastr: ToastrService) { }

  competition: Competition[] = [];
  competitionSubject = new Subject<Competition[]>();

  emitCompetition() {
    this.competitionSubject.next(this.competition);
  }

  async getList() {

    this.http
      .get<any[]>(`${GlobalConstants.apiURL}/competition/list`, this.token.getHeader())
      .subscribe(
        (response) => {
          this.competition = response;
          this.emitCompetition();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }


  async addList(form: Competition) {
    this.http
      .post<any[]>(`${GlobalConstants.apiURL}/competition/add-competition`, form)
      .subscribe(
        (response) => {
          this.toastr.success('La date a bien été enregistrée', 'Succès');

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }


}
