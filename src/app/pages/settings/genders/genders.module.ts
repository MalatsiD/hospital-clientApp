import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GendersRoutingModule } from './genders-routing.module';
import { GendersComponent } from './genders.component';
import { GenderFormComponent } from './gender-form/gender-form.component';
import { GenderFormContainerComponent } from './gender-form-container/gender-form-container.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GendersComponent,
    GenderFormComponent,
    GenderFormContainerComponent
  ],
  imports: [
    CommonModule,
    GendersRoutingModule,
    SharedModule
  ]
})
export class GendersModule { }
