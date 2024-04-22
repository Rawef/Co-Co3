import { TestBed } from '@angular/core/testing';

import { ServiceColService } from './service-col.service';

describe('ServiceColService', () => {
  let service: ServiceColService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceColService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
