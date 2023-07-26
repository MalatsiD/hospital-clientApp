import { ProvinceFormContainerComponent } from './province-form-container/province-form-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvincesComponent } from './provinces.component';

const routes: Routes = [
  {
    path: '',
    component: ProvincesComponent,
    children: [
      {
        path: 'form',
        outlet: 'modal',
        children: [
          {
            path: 'new',
            component: ProvinceFormContainerComponent
          },
          {
            path: 'edit/:id',
            component: ProvinceFormContainerComponent,
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
export class ProvincesRoutingModule { }
