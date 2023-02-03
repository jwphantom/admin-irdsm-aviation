import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Submission } from '../../models/submission';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  public today = new Date();


  public sevenLastDay: Submission[] = []
  public sevenLastDaySubject = new Subject<Submission[]>();



  constructor() { }

  emitSevenLastDay() {
    this.sevenLastDaySubject.next(this.sevenLastDay);
  }

  convertDay(n: number) {
    return n > 9 ? "" + n : "0" + n;
  };

  convertDateCreationToDate(date: any): any {
    //const tempDate = new Date(date).toDateString();
    return `${new Date(date).getFullYear()}/${Number(this.convertDay(new Date(date).getMonth())) + 1
      }/${this.convertDay(new Date(date).getDate())}`;
  };

  setSeventLastDay() {
    const week: any[] = [];
    for (let i = 0; i <= 6; i++) {
      const tomorrow = new Date();
      tomorrow.setDate(this.today.getDate() - i);
      week.push(this.convertDateCreationToDate(tomorrow));
    }

    this.sevenLastDay = week.reverse();
  }


}
