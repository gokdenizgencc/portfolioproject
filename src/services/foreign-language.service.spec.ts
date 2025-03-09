import { TestBed } from '@angular/core/testing';

import { ForeignLanguageService } from './foreign-language.service';

describe('ForeignLanguageService', () => {
  let service: ForeignLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForeignLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
