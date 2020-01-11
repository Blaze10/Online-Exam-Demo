import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresComponent } from './scores.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'user-result', component: ScoresComponent}
];

@NgModule({
  declarations: [ScoresComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ScoresModule { }
