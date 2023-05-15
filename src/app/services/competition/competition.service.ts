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
      .get<any[]>(`${GlobalConstants.apiURL}/competition/list`)
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
      .post<any[]>(`${GlobalConstants.apiURL}/competition/add-competition`, form, this.token.getHeader())
      .subscribe(
        (response) => {
          this.toastr.success('La date a bien été enregistrée', 'Succès');
          this.competition.push(form)

        },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.toastr.error('Impossible d\'ajouter cette date ', 'Echec');

        }
      );

  }

  async deleteCompetition(id: string | undefined) {

    const index = this.competition.findIndex(element => element._id === id);
    if (id) {
      this.http
        .delete<any[]>(`${GlobalConstants.apiURL}/competition/delete-competition/${id}`, this.token.getHeader())
        .subscribe(
          (response) => {
            this.toastr.success('Date de concours supprimé', 'Succès');

            if (index !== -1) {
              // Suppression de l'élément du tableau
              this.competition.splice(index, 1);
            }

          },
          (error) => {
            console.log('Erreur ! : ' + error);
            this.toastr.error('Impossible de supprimer cette date ', 'Echec');

          }
        );
    }

  }


}
