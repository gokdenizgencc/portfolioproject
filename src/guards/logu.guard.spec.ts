import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loguGuard } from './logu.guard';

describe('loguGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loguGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
