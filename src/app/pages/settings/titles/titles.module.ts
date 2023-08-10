import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitlesRoutingModule } from './titles-routing.module';
import { TitlesComponent } from './titles.component';
import { TitleFormComponent } from './title-form/title-form.component';
import { TitleFormContainerComponent } from './title-form-container/title-form-container.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TitlesComponent,
    TitleFormComponent,
    TitleFormContainerComponent
  ],
  imports: [
    CommonModule,
    TitlesRoutingModule,
    SharedModule
  ]
})
export class TitlesModule { }
