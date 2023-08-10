import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitlesComponent } from './titles.component';
import { TitleFormContainerComponent } from './title-form-container/title-form-container.component';

const routes: Routes = [
  {
    path: '',
    component: TitlesComponent,
    children: [
      {
        path: 'form',
        outlet: 'modal',
        children: [
          {
            path: 'new',
            component: TitleFormContainerComponent
          },
          {
            path: 'edit/:id',
            component: TitleFormContainerComponent
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
export class TitlesRoutingModule { }
