import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RouterModule } from '@angular/router';
import { SublevelMenuComponent } from './sidenav/sublevel-menu/sublevel-menu.component';



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
  ],
  exports: [
    SidenavComponent,
    ContentContainerComponent,
    TopnavComponent
  ]
})
export class CoreModule { }
