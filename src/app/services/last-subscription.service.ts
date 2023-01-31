import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Submission } from '../models/submission';
import { DayService } from './day.service';

@Injectable({
  providedIn: 'root'
})

//ce service permet de calculer les 7 dernières souscriptions et affichier sur le grapher
export class LastSubscriptionService {


  countSubscriptionByDay: Submission[] = []
  countSubscriptionByDaysubject = new Subject<Submission[]>();


  constructor(private day: DayService) { }

  emitcountSubscriptionByDay() {
    this.countSubscriptionByDaysubject.next(this.countSubscriptionByDay);
  }

  clone(data: any) {
    return JSON.parse(JSON.stringify(data));
  };

  findCountSubscriptionByDay(date: string, data: any[]) {
    return this.clone(data).filter(
      (d: { dateCreation: Date }) =>
        this.day.convertDateCreationToDate(d.dateCreation) === date
    ).length;
  };

  async setCountSubscriptionByDay(submission: any) {
    for (let i = 0; i < this.day.sevenLastDay.length; i++) {
      this.countSubscriptionByDay.push(this.findCountSubscriptionByDay(this.day.convertDateCreationToDate(this.day.sevenLastDay[i]), submission))
    }
  }

}
