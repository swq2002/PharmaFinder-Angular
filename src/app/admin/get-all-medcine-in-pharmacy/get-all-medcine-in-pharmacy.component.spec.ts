import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllMedcineInPharmacyComponent } from './get-all-medcine-in-pharmacy.component';

describe('GetAllMedcineInPharmacyComponent', () => {
  let component: GetAllMedcineInPharmacyComponent;
  let fixture: ComponentFixture<GetAllMedcineInPharmacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllMedcineInPharmacyComponent]
    });
    fixture = TestBed.createComponent(GetAllMedcineInPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
