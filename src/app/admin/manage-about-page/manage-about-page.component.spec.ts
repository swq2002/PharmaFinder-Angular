import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAboutPageComponent } from './manage-about-page.component';

describe('ManageAboutPageComponent', () => {
  let component: ManageAboutPageComponent;
  let fixture: ComponentFixture<ManageAboutPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAboutPageComponent]
    });
    fixture = TestBed.createComponent(ManageAboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
