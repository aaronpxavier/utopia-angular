import { TestBed } from '@angular/core/testing';

import { AirportSelectionService } from './airport-selection.service';

describe('AirportSelectionService', () => {
  let service: AirportSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
