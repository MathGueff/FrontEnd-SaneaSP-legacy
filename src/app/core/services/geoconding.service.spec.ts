import { TestBed } from '@angular/core/testing';

import { GeocondingService } from './geoconding.service';

describe('GeocondingService', () => {
  let service: GeocondingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocondingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
