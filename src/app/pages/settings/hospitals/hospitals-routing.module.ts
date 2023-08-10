import { HospitalFormConatinerComponent } from './hospital-form-conatiner/hospital-form-conatiner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalsComponent } from './hospitals.component';

const routes: Routes = [
  {
    path: '',
    component: HospitalsComponent,
    children: [
      {
        path: 'form',
        outlet: 'modal',
        children: [
          {
            path: 'new',
            component: HospitalFormConatinerComponent
          },
          {
            path: 'edit/:id',
            component: HospitalFormConatinerComponent
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
export class HospitalsRoutingModule { }
