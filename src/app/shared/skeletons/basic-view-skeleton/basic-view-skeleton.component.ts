import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-view-skeleton',
  templateUrl: './basic-view-skeleton.component.html',
  styleUrls: ['./basic-view-skeleton.component.scss']
})
export class BasicViewSkeletonComponent {
  @Input() fakeData: any = [];
  @Input() tableColumns: string[] = [];
}
