import { TestBed, async, inject } from '@angular/core/testing';

import { RolesGuardGuard } from './roles-guard.guard';

describe('RolesGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolesGuardGuard]
    });
  });

  it('should ...', inject([RolesGuardGuard], (guard: RolesGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
