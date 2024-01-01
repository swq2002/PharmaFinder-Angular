import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MohammadComponent } from './mohammad.component';

describe('MohammadComponent', () => {
  let component: MohammadComponent;
  let fixture: ComponentFixture<MohammadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MohammadComponent]
    });
    fixture = TestBed.createComponent(MohammadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
