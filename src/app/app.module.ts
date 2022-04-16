import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

//import environment
import { environment } from '../environments/environment';

//angular fire import
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';

//component
import { HomeComponent } from './pages/home/home.component';
import { LocaleService } from './services/locale.service';
import { HeaderComponent } from './static/header/header.component';
import { PartnerComponent } from './static/partner/partner.component';
import { FooterComponent } from './static/footer/footer.component';
import { MenuComponent } from './static/menu/menu.component';
import { ScrollTopComponent } from './static/scroll-top/scroll-top.component';
import { PageTitleComponent } from './static/page-title/page-title.component';
import { LanguageComponent } from './static/language/language.component';
import { SubmissionComponent } from './pages/submission/submission.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Material Design
import { MaterialExampleModule } from 'material.module';
import { MatNativeDateModule } from '@angular/material/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//authguard
import { AuthGuard } from './shared/auth.guard';
import { SubmissionService } from './services/submission.service';
import { FourOhFourComponent } from './pages/four-oh-four/four-oh-four.component';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExportService } from './services/export.service';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    PartnerComponent,
    FooterComponent,
    MenuComponent,
    ScrollTopComponent,
    PageTitleComponent,
    LanguageComponent,
    SubmissionComponent,
    FourOhFourComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,

  ],
  providers: [LocaleService, AuthGuard, SubmissionService, DatePipe, ExportService],
  bootstrap: [AppComponent,
  ]
})
export class AppModule { }


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}