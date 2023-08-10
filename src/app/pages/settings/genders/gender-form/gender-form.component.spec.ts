import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderFormComponent } from './gender-form.component';

describe('GenderFormComponent', () => {
  let component: GenderFormComponent;
  let fixture: ComponentFixture<GenderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenderFormComponent]
    });
    fixture = TestBed.createComponent(GenderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
