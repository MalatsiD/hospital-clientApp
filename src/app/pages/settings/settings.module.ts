import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CountriesComponent } from './countries/countries.component';
import { ProvincesComponent } from './provinces/provinces.component';
import { CitiesComponent } from './cities/cities.component';

import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    CountriesComponent,
    ProvincesComponent,
    CitiesComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ButtonModule,
    FieldsetModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    InputTextModule
  ]
})
export class SettingsModule { }
