import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupAddComponent } from './setup-add/setup-add.component';
import { SetupListComponent } from './setup-list/setup-list.component';
import { SetupRoutingModule } from './setup-module.routing';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SetupAddComponent, SetupListComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    ReactiveFormsModule
  ]
})
export class SetupModule { }
