import { TestBed } from '@angular/core/testing';

import { Bed } from './bed';

describe('Bed', () => {
  let service: Bed;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bed);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
