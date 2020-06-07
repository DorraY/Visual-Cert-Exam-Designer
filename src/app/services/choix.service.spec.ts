import { TestBed } from '@angular/core/testing';

import { ChoixService } from './choix.service';

describe('ChoixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChoixService = TestBed.get(ChoixService);
    expect(service).toBeTruthy();
  });
});
