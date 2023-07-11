import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { SideNavToggle } from './interfaces/side-nav-toggle';
import { Router } from '@angular/router';
import { INavbarData, fadeInOut } from './interfaces/helper';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
        keyframes([
          style({transform: 'rotate(0deg)', offset: 0}),
          style({transform: 'rotate(2turn)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  
  collapsed = true;
  screenWidth = 0;
  multiple: boolean = false;

  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = true;
      this.setSideNavToggle();
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.setSideNavToggle();
  }

  closeSidenav(): void {
    this.collapsed = true;
    this.setSideNavToggle();
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if(!this.multiple) {
      for(let modelItem of this.navData) {
        if(item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  setSideNavToggle(): void {
    this.onToggleSideNav.emit({ 
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    });
  }
}
