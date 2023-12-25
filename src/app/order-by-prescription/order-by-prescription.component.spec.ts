import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByPrescriptionComponent } from './order-by-prescription.component';

describe('OrderByPrescriptionComponent', () => {
  let component: OrderByPrescriptionComponent;
  let fixture: ComponentFixture<OrderByPrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderByPrescriptionComponent]
    });
    fixture = TestBed.createComponent(OrderByPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
