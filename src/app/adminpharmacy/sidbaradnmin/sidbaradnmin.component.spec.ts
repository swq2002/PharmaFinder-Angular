import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbaradnminComponent } from './sidbaradnmin.component';

describe('SidbaradnminComponent', () => {
  let component: SidbaradnminComponent;
  let fixture: ComponentFixture<SidbaradnminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidbaradnminComponent]
    });
    fixture = TestBed.createComponent(SidbaradnminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
