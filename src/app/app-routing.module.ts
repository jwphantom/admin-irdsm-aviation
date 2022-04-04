import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { FourOhFourComponent } from './pages/four-oh-four/four-oh-four.component';
import { HomeComponent } from './pages/home/home.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { AuthGuard } from "./shared/auth.guard";


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: '', component: SubmissionComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
