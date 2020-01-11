import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupAddComponent } from './setup-add/setup-add.component';
import { SetupListComponent } from './setup-list/setup-list.component';

const routes: Routes = [
  {path: 'setup-create', component: SetupAddComponent},
  {path: 'setup-edit/:id', component: SetupAddComponent},
  {path: 'setup-list', component: SetupListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
