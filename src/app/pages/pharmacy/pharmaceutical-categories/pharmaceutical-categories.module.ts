import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmaceuticalCategoriesRoutingModule } from './pharmaceutical-categories-routing.module';
import { PharmaceuticalCategoriesComponent } from './pharmaceutical-categories.component';


@NgModule({
  declarations: [
    PharmaceuticalCategoriesComponent
  ],
  imports: [
    CommonModule,
    PharmaceuticalCategoriesRoutingModule
  ]
})
export class PharmaceuticalCategoriesModule { }
