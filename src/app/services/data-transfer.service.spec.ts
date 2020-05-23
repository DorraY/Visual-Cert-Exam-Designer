import { TestBed } from '@angular/core/testing';

import { DataTransferService } from './data-transfer.service';

describe('DataTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTransferService = TestBed.get(DataTransferService);
    expect(service).toBeTruthy();
  });
});
