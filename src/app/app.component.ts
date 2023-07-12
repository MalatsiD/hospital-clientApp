import { Component } from '@angular/core';
import { SideNavToggle } from './core/sidenav/interfaces/side-nav-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-clientApp';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
   this.screenWidth = data.screenWidth;
   this.isSideNavCollapsed = data.collapsed;
  }
}
