import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalFormComponent } from './hospital-form.component';

describe('HospitalFormComponent', () => {
  let component: HospitalFormComponent;
  let fixture: ComponentFixture<HospitalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalFormComponent]
    });
    fixture = TestBed.createComponent(HospitalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
