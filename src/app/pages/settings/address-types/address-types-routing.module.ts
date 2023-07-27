import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressTypesComponent } from './address-types.component';
import { AddressTypeFormContainerComponent } from './address-type-form-container/address-type-form-container.component';

const routes: Routes = [
  {
    path: '',
    component: AddressTypesComponent,
    children: [
      {
        path: 'form',
        outlet: 'modal',
        children: [
          {
            path: 'new',
            component: AddressTypeFormContainerComponent
          },
          {
            path: 'edit/:id',
            component: AddressTypeFormContainerComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressTypesRoutingModule { }
