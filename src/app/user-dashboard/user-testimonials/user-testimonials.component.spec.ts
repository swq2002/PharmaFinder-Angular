import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTestimonialsComponent } from './user-testimonials.component';

describe('UserTestimonialsComponent', () => {
  let component: UserTestimonialsComponent;
  let fixture: ComponentFixture<UserTestimonialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTestimonialsComponent]
    });
    fixture = TestBed.createComponent(UserTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
