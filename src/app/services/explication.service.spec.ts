import { TestBed } from '@angular/core/testing';

import { ExplicationService } from './explication.service';

describe('ExplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExplicationService = TestBed.get(ExplicationService);
    expect(service).toBeTruthy();
  });
});
