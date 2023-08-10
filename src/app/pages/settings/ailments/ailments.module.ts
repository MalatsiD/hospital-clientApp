import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AilmentsRoutingModule } from './ailments-routing.module';
import { AilmentsComponent } from './ailments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AilmentFormComponent } from './ailment-form/ailment-form.component';
import { AilmentFormContainerComponent } from './ailment-form-container/ailment-form-container.component';


@NgModule({
  declarations: [
    AilmentsComponent,
    AilmentFormComponent,
    AilmentFormContainerComponent
  ],
  imports: [
    CommonModule,
    AilmentsRoutingModule,
    SharedModule
  ]
})
export class AilmentsModule { }
