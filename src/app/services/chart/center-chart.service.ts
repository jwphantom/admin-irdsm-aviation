import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CenterChartService {

  constructor() { }

  clone(data: any) {
    return JSON.parse(JSON.stringify(data));
  };


  centerLengthFilter(center: string, data: any[]) {
    return this.clone(data).filter((d: { center: string }) => d.center === center);
  };


}
