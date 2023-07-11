import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavbarData, fadeInOut } from '../interfaces/helper';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sublevel-menu',
  templateUrl: './sublevel-menu.component.html',
  styleUrls: ['../sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [
        style({overflow: 'hidden'}),
        animate('{{transitionParams}}'),
        transition('void => *', animate(0))
      ])
    ])
  ]
})
export class SublevelMenuComponent implements OnInit {

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  };
  @Input() collapsed = true;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Data: ', this.data);
  }

  handleClick(item: any): void {
    if(!this.multiple) {
      if(this.data.items && this.data.items.length > 0) {
        for(let modelItem of this.data.items) {
          if(item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbarData): string {
    return item.expanded &&  this.router.url.includes(item.routeLink) ? 'active-sublevel' : '';
  }
}
