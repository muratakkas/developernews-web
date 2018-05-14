import { TestBed, inject } from '@angular/core/testing';

import { HttphelperService } from './httphelper.service';

describe('HttphelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttphelperService]
    });
  });

  it('should be created', inject([HttphelperService], (service: HttphelperService) => {
    expect(service).toBeTruthy();
  }));
});
