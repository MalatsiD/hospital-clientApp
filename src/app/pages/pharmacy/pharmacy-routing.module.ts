import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmaceuticalsComponent } from './pharmaceuticals/pharmaceuticals.component';
import { PharmaceuticalCategoriesComponent } from './pharmaceutical-categories/pharmaceutical-categories.component';

const routes: Routes = [
  {
    path: 'pharmaceuticals',
    loadChildren: () => import('./pharmaceuticals/pharmaceuticals.module').then(m => m.PharmaceuticalsModule)
  },
  {
    path: 'pharmaceutical-categories',
    loadChildren: () => import('./pharmaceutical-categories/pharmaceutical-categories.module').then(m => m.PharmaceuticalCategoriesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
