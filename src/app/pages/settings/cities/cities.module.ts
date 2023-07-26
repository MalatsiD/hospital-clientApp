import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { CityFormContainerComponent } from './city-form-container/city-form-container.component';
import { CitiesComponent } from './cities.component';
import { CityFormComponent } from './city-form/city-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CitiesComponent,
    CityFormComponent,
    CityFormContainerComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    SharedModule
  ]
})
export class CitiesModule { }
