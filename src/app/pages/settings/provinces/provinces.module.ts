import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvincesRoutingModule } from './provinces-routing.module';
import { ProvinceFormComponent } from './province-form/province-form.component';
import { ProvincesComponent } from './provinces.component';
import { ProvinceFormContainerComponent } from './province-form-container/province-form-container.component';


@NgModule({
  declarations: [
    ProvincesComponent,
    ProvinceFormComponent,
    ProvinceFormContainerComponent,
  ],
  imports: [
    CommonModule,
    ProvincesRoutingModule,
    SharedModule
  ]
})
export class ProvincesModule { }
