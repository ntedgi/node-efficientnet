import { TestBed } from '@angular/core/testing';

import { ObjectorService } from './objector.service';

describe('ObjectorService', () => {
  let service: ObjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
