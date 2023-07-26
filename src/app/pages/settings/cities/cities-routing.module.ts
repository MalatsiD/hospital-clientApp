import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities.component';
import { CityFormContainerComponent } from './city-form-container/city-form-container.component';

const routes: Routes = [
  {
    path: '',
    component: CitiesComponent,
    children: [
      {
        path: 'form',
        outlet: 'modal',
        children: [
          {
            path: 'new',
            component: CityFormContainerComponent
          },
          {
            path: 'edit/:id',
            component: CityFormContainerComponent
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
export class CitiesRoutingModule { }
