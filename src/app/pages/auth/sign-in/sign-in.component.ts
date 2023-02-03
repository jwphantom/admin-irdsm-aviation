import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private title: Title,
    private auth: AuthService) { }

  ngOnInit() {

    this.title.setTitle("IRDSM AVIATION - sign In");

    //this.storeAdmission()

    console.log(this.auth.getUser())

    this.loadScript('../assets/js/jquery.js');
    this.loadScript('../assets/js/plugins.js');
    this.loadScript('../assets/js/functions.js');

  }

  login(email: string, password: string) {

    this.auth.SignIn(email, password)
  }


  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
