import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Submission } from '../models/submission';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  sexeChart: Submission[] = [];
  sexeChartSubject = new Subject<Submission[]>();

  public today = new Date();



  constructor() { }


}
