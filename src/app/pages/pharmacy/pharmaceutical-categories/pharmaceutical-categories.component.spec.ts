import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaceuticalCategoriesComponent } from './pharmaceutical-categories.component';

describe('PharmaceuticalCategoriesComponent', () => {
  let component: PharmaceuticalCategoriesComponent;
  let fixture: ComponentFixture<PharmaceuticalCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmaceuticalCategoriesComponent]
    });
    fixture = TestBed.createComponent(PharmaceuticalCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
