import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincesComponent } from './provinces.component';

describe('ProvincesComponent', () => {
  let component: ProvincesComponent;
  let fixture: ComponentFixture<ProvincesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvincesComponent]
    });
    fixture = TestBed.createComponent(ProvincesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
