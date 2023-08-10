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
  },
  {
    path: 'address-types',
    loadChildren: () => import('./address-types/address-types.module').then(m => m.AddressTypesModule)
  },
  {
    path: 'hospitals',
    loadChildren: () => import('./hospitals/hospitals.module').then(m => m.HospitalsModule)
  },
  {
    path: 'ailments',
    loadChildren: () => import('./ailments/ailments.module').then(m => m.AilmentsModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: 'genders',
    loadChildren: () => import('./genders/genders.module').then(m => m.GendersModule)
  },
  {
    path: 'titles',
    loadChildren: () => import('./titles/titles.module').then(m => m.TitlesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
