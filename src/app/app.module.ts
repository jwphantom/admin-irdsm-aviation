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
import { LocaleService } from './services/locale/locale.service';
import { PartnerComponent } from './static/partner/partner.component';
import { FooterComponent } from './static/footer/footer.component';
import { MenuComponent } from './static/menu/menu.component';
import { ScrollTopComponent } from './static/scroll-top/scroll-top.component';
import { PageTitleComponent } from './static/page-title/page-title.component';
import { LanguageComponent } from './static/language/language.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { SubmissionComponent as SubmissionPolytechniqueComponent } from './pages/polytechnique/submission/submission.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Material Design
import { MaterialExampleModule } from 'material.module';
import { MatNativeDateModule } from '@angular/material/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//authguard
import { AuthGuard } from './shared/auth.guard';
import { SubmissionService } from './services/submission/submission.service';
import { FourOhFourComponent } from './pages/four-oh-four/four-oh-four.component';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExportService } from './services/submission/export.service';

//chart  component
import { ChartComponent } from './pages/chart/chart.component';
import { LoadScript } from './services/script/loadScript.service';
import { NgChartsModule } from 'ng2-charts';

//skeleton component
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ChartService } from './services/chart/chart.service';
import { LastSubscriptionService } from './services/chart/last-subscription.service';
import { CenterChartService } from './services/chart/center-chart.service';
import { SexChartService } from './services/chart/sex-chart.service';
import { SexChartComponent } from './components/chart/sex-chart/sex-chart.component';
import { CenterChartComponent } from './components/chart/center-chart/center-chart.component';
import { LastSubmissionChartComponent } from './components/chart/last-submission-chart/last-submission-chart.component';
import { TokenService } from './services/token/token.service';
import { AuthService } from './services/auth/auth.service';
import { CompetitionsComponent } from './pages/competitions/competitions.component';
import { CompetitionService } from './services/competition/competition.service';
import { DayService } from './services/chart/day.service';


//toast
import { ToastrModule } from 'ngx-toastr';

//pdf service
import { PdfService } from './services/pdf/pdf.service';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    PartnerComponent,
    FooterComponent,
    MenuComponent,
    ScrollTopComponent,
    PageTitleComponent,
    LanguageComponent,
    SubmissionComponent,
    FourOhFourComponent,
    SubmissionPolytechniqueComponent,
    ChartComponent,
    SexChartComponent,
    CenterChartComponent,
    LastSubmissionChartComponent,
    CompetitionsComponent,
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
    NgChartsModule,
    AngularFireDatabaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })


  ],
  providers: [
    LocaleService,
    AuthGuard,
    AuthService,
    LastSubscriptionService,
    ChartService,
    CenterChartService,
    SexChartService,
    DatePipe,
    ExportService,
    LoadScript,
    TokenService,
    LoadScript,
    PdfService,
    CompetitionService],
  bootstrap: [AppComponent,
  ]
})
export class AppModule { }


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}