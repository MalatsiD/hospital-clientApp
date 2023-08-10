import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AilmentFormComponent } from './ailment-form.component';

describe('AilmentFormComponent', () => {
  let component: AilmentFormComponent;
  let fixture: ComponentFixture<AilmentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AilmentFormComponent]
    });
    fixture = TestBed.createComponent(AilmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
