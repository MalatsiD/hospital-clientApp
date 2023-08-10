import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmaceuticalCategoriesComponent } from './pharmaceutical-categories.component';

const routes: Routes = [
  {
    path: '',
    component: PharmaceuticalCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmaceuticalCategoriesRoutingModule { }
