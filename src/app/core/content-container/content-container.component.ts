import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss']
})
export class ContentContainerComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';

    if(!this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(!this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }
}
