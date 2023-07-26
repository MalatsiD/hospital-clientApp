import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountryFormComponent } from './country-form/country-form.component';
import { CountriesComponent } from './countries.component';


@NgModule({
  declarations: [
    CountriesComponent,
    CountryFormComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule
  ]
})
export class CountriesModule { }
