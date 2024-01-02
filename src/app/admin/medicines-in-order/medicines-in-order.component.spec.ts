import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesInOrderComponent } from './medicines-in-order.component';

describe('MedicinesInOrderComponent', () => {
  let component: MedicinesInOrderComponent;
  let fixture: ComponentFixture<MedicinesInOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicinesInOrderComponent]
    });
    fixture = TestBed.createComponent(MedicinesInOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
