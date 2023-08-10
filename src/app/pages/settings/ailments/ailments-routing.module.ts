import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AilmentsComponent } from './ailments.component';
import { AilmentFormContainerComponent } from './ailment-form-container/ailment-form-container.component';

const routes: Routes = [
  {
    path: '',
    component: AilmentsComponent,
    children: [
      {
        path: 'form',
        outlet: 'modal',
        children: [
          {
            path: 'new',
            component: AilmentFormContainerComponent
          },
          {
            path: 'edit/:id',
            component: AilmentFormContainerComponent
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
export class AilmentsRoutingModule { }
