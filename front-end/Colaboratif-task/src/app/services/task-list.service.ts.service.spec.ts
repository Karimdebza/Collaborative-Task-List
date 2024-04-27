import { TestBed } from '@angular/core/testing';

import { TaskListServiceTsService } from './task-list.service.ts.service';

describe('TaskListServiceTsService', () => {
  let service: TaskListServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
