import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebaradminComponent } from './sidebaradmin.component';

describe('SidebaradminComponent', () => {
  let component: SidebaradminComponent;
  let fixture: ComponentFixture<SidebaradminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebaradminComponent]
    });
    fixture = TestBed.createComponent(SidebaradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
