import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  public year = GlobalConstants.year;
  public version = GlobalConstants.version;
  public appname = GlobalConstants.appname;
  public localisation = GlobalConstants.localisation;
  public phone1 = GlobalConstants.phone1;
  public phone2 = GlobalConstants.phone2;
  public email = GlobalConstants.email;


  ngOnInit(): void {
  }

}
