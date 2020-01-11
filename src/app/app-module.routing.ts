import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { StudentAuthGuard } from './auth/student-auth.guard';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'setup', loadChildren: './setup/setup.module#SetupModule', canActivate: [AdminAuthGuard]},
  {path: 'exam', loadChildren: './exams/exams.module#ExamsModule', canActivate: [StudentAuthGuard]},
  {path: 'scores', loadChildren: './scores/scores.module#ScoresModule', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminAuthGuard, StudentAuthGuard, AuthGuard]
})
export class AppRoutingModule { }
