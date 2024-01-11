import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomePageComponent } from './manage-home-page.component';

describe('ManageHomePageComponent', () => {
  let component: ManageHomePageComponent;
  let fixture: ComponentFixture<ManageHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageHomePageComponent]
    });
    fixture = TestBed.createComponent(ManageHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
