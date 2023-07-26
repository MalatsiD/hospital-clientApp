import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: 'provinces',
    loadChildren: () => import('./provinces/provinces.module').then(m => m.ProvincesModule)
  },
  {
    path: 'cities',
    loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
