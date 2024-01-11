import { TestBed } from '@angular/core/testing';

import { AdminPharmacyService } from './admin-pharmacy.service';

describe('AdminPharmacyService', () => {
  let service: AdminPharmacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPharmacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
