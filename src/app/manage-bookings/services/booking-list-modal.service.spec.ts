import { TestBed } from '@angular/core/testing';

import { BookingListModalService } from './booking-list-modal.service';

describe('BookingListModalService', () => {
  let service: BookingListModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingListModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
