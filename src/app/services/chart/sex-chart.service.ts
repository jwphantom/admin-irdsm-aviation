import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SexChartService {

  constructor() { }

  clone(data: any) {
    return JSON.parse(JSON.stringify(data));
  };

  sexeLengthFilter(sexe: string, data: any[]) {
    return this.clone(data).filter((d: { sexe: string }) => d.sexe === sexe);
  };
}
