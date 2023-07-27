import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTypeFormComponent } from './address-type-form.component';

describe('AddressTypeFormComponent', () => {
  let component: AddressTypeFormComponent;
  let fixture: ComponentFixture<AddressTypeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressTypeFormComponent]
    });
    fixture = TestBed.createComponent(AddressTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
