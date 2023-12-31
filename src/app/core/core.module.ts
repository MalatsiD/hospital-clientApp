import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RouterModule } from '@angular/router';
import { SublevelMenuComponent } from './sidenav/sublevel-menu/sublevel-menu.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';

import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SidenavComponent,
    ContentContainerComponent,
    TopnavComponent,
    SublevelMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule,
    CdkMenuModule,
    FieldsetModule,
    BreadcrumbModule,
    SharedModule
  ],
  exports: [
    SidenavComponent,
    ContentContainerComponent,
    TopnavComponent
  ]
})
export class CoreModule { }
