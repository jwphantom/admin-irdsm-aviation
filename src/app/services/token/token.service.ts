import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private token: string = localStorage.getItem('ACCESS_TOKEN')!;


  getToken() {
    return this.token
  }

  getHeader() {
    return {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.getToken()}`)
    }
  }
}
