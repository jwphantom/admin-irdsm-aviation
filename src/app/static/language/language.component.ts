import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from 'src/app/services/locale/locale.service';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() lang!: string;


  constructor(private translate: TranslateService,
    private localeService: LocaleService) {
  }

  ngOnInit() {
    this.lang = this.localeService.lang
  }

  switchFr() {
    this.localeService.switchFr();
    this.translate.use("fr");
    this.lang = "fr"


  }

  switchEn() {
    console.log()
    this.localeService.switchEn();
    this.translate.use("en");

    this.lang = "en"

  }

}
