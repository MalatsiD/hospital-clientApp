import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalsComponent } from './hospitals.component';
import { HospitalFormComponent } from './hospital-form/hospital-form.component';
import { HospitalFormConatinerComponent } from './hospital-form-conatiner/hospital-form-conatiner.component';


@NgModule({
  declarations: [
    HospitalsComponent,
    HospitalFormComponent,
    HospitalFormConatinerComponent
  ],
  imports: [
    CommonModule,
    HospitalsRoutingModule,
    SharedModule
  ]
})
export class HospitalsModule { }
