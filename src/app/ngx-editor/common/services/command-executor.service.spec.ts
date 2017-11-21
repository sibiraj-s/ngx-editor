import { TestBed, inject } from '@angular/core/testing';

import { CommandExecutorService } from './command-executor.service';

describe('CommandExecutorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandExecutorService]
    });
  });

  it('should be created', inject([CommandExecutorService], (service: CommandExecutorService) => {
    expect(service).toBeTruthy();
  }));
});
