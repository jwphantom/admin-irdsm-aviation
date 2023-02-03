import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.SignOut();

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);

    return !!Object.keys(user).length ? true : false;
  }

}
