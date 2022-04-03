import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from './services/locale.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Irdsm Aviation';


  constructor(private translate: TranslateService,
    private localeservice: LocaleService,
    private router: Router) {
    translate.setDefaultLang(this.localeservice.lang);
  }

  ngOnInit() {
  }


  onActivate(event: any) {
    window.scroll(0, 0);

  }
}
