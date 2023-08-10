import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmaceuticalsRoutingModule } from './pharmaceuticals-routing.module';
import { PharmaceuticalsComponent } from './pharmaceuticals.component';


@NgModule({
  declarations: [
    PharmaceuticalsComponent
  ],
  imports: [
    CommonModule,
    PharmaceuticalsRoutingModule
  ]
})
export class PharmaceuticalsModule { }
