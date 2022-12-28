import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { FourOhFourComponent } from './pages/four-oh-four/four-oh-four.component';
import { HomeComponent } from './pages/home/home.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { SubmissionComponent as SubmissionPolytechniqueComponent } from './pages/polytechnique/submission/submission.component';
import { AuthGuard } from "./shared/auth.guard";
import { ChartComponent } from './pages/chart/chart.component';


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'statistics', component: ChartComponent, canActivate: [AuthGuard] },
  { path: '', component: SubmissionComponent, canActivate: [AuthGuard] },
  { path: 'polytechnique/admission', component: SubmissionPolytechniqueComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
