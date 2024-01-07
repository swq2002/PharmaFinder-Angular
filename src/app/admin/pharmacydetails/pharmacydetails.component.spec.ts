import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacydetailsComponent } from './pharmacydetails.component';

describe('PharmacydetailsComponent', () => {
  let component: PharmacydetailsComponent;
  let fixture: ComponentFixture<PharmacydetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmacydetailsComponent]
    });
    fixture = TestBed.createComponent(PharmacydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
