import { TestBed } from '@angular/core/testing';

import { LastSubscriptionService } from './last-subscription.service';

describe('SevenLastDayService', () => {
  let service: LastSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
