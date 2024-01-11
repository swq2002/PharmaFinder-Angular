import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchsalesComponent } from './searchsales.component';

describe('SearchsalesComponent', () => {
  let component: SearchsalesComponent;
  let fixture: ComponentFixture<SearchsalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchsalesComponent]
    });
    fixture = TestBed.createComponent(SearchsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
