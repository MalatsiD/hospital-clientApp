import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CountriesComponent } from './countries/countries.component';
import { ProvincesComponent } from './provinces/provinces.component';
import { CitiesComponent } from './cities/cities.component';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CountriesComponent,
    ProvincesComponent,
    CitiesComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
