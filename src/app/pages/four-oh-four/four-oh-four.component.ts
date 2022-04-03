import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-four-oh-four',
  templateUrl: './four-oh-four.component.html',
  styleUrls: ['./four-oh-four.component.scss']
})
export class FourOhFourComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit() {

    this.title.setTitle("Irdsm Aviation - Page Introuvable");

    this.loadScript('../assets/js/jquery.js');
    this.loadScript('../assets/js/plugins.js');
    this.loadScript('../assets/js/functions.js');

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
