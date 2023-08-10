import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GendersComponent } from './genders.component';
import { GenderFormContainerComponent } from './gender-form-container/gender-form-container.component';

const routes: Routes = [
  {
    path: '',
    component: GendersComponent,
    children: [
      {
        path: 'form',
        outlet: 'modal',
        children: [
          {
            path: 'new',
            component: GenderFormContainerComponent
          },
          {
            path: 'edit/:id',
            component: GenderFormContainerComponent
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
export class GendersRoutingModule { }
