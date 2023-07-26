import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries.component';
import { CountryFormContainer } from './country-form-container/country-form-container';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
    children: [
      {
        path: 'form',
        outlet: 'modal',
        children: [
          {
            path: 'new',
            component: CountryFormContainer
          },
          {
            path: 'edit/:id',
            component: CountryFormContainer,
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
export class CountriesRoutingModule { }
