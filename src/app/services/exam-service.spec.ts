import { TestBed } from '@angular/core/testing';

import { ExamService } from './exam-service';

describe('ExamServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamService = TestBed.get(ExamService);
    expect(service).toBeTruthy();
  });
});
