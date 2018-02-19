import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CommandExecutorService } from './command-executor.service';
import { MessageService } from './message.service';

describe('CommandExecutorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CommandExecutorService, MessageService]
    });
  });

  it('should be created', inject([CommandExecutorService], (service: CommandExecutorService) => {
    expect(service).toBeTruthy();
  }));
});
