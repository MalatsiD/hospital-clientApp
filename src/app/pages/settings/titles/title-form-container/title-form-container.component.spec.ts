import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleFormContainerComponent } from './title-form-container.component';

describe('TitleFormContainerComponent', () => {
  let component: TitleFormContainerComponent;
  let fixture: ComponentFixture<TitleFormContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleFormContainerComponent]
    });
    fixture = TestBed.createComponent(TitleFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
