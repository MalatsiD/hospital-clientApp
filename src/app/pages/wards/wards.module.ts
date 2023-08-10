import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardsRoutingModule } from './wards-routing.module';
import { WardsComponent } from './wards.component';


@NgModule({
  declarations: [
    WardsComponent
  ],
  imports: [
    CommonModule,
    WardsRoutingModule
  ]
})
export class WardsModule { }
