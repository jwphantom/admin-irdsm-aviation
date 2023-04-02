import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Competition } from 'src/app/models/competition';
import { DayService } from 'src/app/services/chart/day.service';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import { LoadScript } from 'src/app/services/script/loadScript.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent {

  dateSelect: any = null;
  today = new Date();
  differenceEnJours: Number = 0;
  name?: string;
  code?: string

  constructor(
    private title: Title,
    private datePipe: DatePipe,
    public loadScript: LoadScript,
    public dayService: DayService,

    public competitionService: CompetitionService

  ) { }

  ngOnInit() {

    this.title.setTitle("IRDSM AVIATION - Gestions des concours");

    this.loadScript.loadJS();

  }


  selectDateCompetition() {
    const maDate = new Date(this.dateSelect); // Créer un objet Date
    const mois = new Intl.DateTimeFormat('fr', { month: 'long' }).format(maDate); // Récupérer le nom du mois en français
    const jour = maDate.getDate(); // Récupérer le jour du mois
    const annee = maDate.getFullYear(); // Récupérer l'année

    this.code = `${this.dayService.convertDay(jour)}${mois}${annee}`; // Créer la chaîne de caractères au format souhaité
    this.name = `Concours du ${this.dayService.convertDay(jour)} ${mois} ${annee}`; // Créer la chaîne de caractères au format souhaité


    const differenceEnTemps = maDate.getTime() - this.today.getTime(); // Calculer la différence de temps en millisecondes
    this.differenceEnJours = Math.ceil(differenceEnTemps / (1000 * 3600 * 24)); // Convertir la différence de temps en jours et arrondir à la valeur supérieure

  }

  saveDateCompetition() {
    const form: Competition = {
      code: this.code,
      name: this.name
    };

    this.competitionService.addList(form)

  }
}
