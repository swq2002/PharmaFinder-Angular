import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestimonialComponent } from './create-testimonial.component';

describe('CreateTestimonialComponent', () => {
  let component: CreateTestimonialComponent;
  let fixture: ComponentFixture<CreateTestimonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTestimonialComponent]
    });
    fixture = TestBed.createComponent(CreateTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
