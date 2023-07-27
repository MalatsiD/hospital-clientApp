import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressTypesRoutingModule } from './address-types-routing.module';
import { AddressTypesComponent } from './address-types.component';
import { AddressTypeFormComponent } from './address-type-form/address-type-form.component';
import { AddressTypeFormContainerComponent } from './address-type-form-container/address-type-form-container.component';


@NgModule({
  declarations: [
    AddressTypesComponent,
    AddressTypeFormComponent,
    AddressTypeFormContainerComponent
  ],
  imports: [
    CommonModule,
    AddressTypesRoutingModule,
    SharedModule
  ]
})
export class AddressTypesModule { }
