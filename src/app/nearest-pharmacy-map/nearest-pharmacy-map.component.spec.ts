import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestPharmacyMapComponent } from './nearest-pharmacy-map.component';

describe('NearestPharmacyMapComponent', () => {
  let component: NearestPharmacyMapComponent;
  let fixture: ComponentFixture<NearestPharmacyMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NearestPharmacyMapComponent]
    });
    fixture = TestBed.createComponent(NearestPharmacyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
