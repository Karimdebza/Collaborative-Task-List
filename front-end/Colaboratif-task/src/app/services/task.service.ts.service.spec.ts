import { TestBed } from '@angular/core/testing';

import { TaskServiceTsService } from './task.service.ts.service';

describe('TaskServiceTsService', () => {
  let service: TaskServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
