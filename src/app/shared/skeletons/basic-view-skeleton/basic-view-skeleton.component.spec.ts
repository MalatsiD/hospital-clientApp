import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicViewSkeletonComponent } from './basic-view-skeleton.component';

describe('BasicViewSkeletonComponent', () => {
  let component: BasicViewSkeletonComponent;
  let fixture: ComponentFixture<BasicViewSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicViewSkeletonComponent]
    });
    fixture = TestBed.createComponent(BasicViewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
