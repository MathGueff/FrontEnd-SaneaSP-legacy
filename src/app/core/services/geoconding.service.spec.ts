import { TestBed } from '@angular/core/testing';

import { GeocodingService } from './geoconding.service';

describe('GeocondingService', () => {
  let service: GeocodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
