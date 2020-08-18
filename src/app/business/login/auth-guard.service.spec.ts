import { TestBed, async } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing'; 

import { HttpClientModule } from '@angular/common/http';
  
describe('AuthGuard service', () => {
 
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule,RouterTestingModule.withRoutes([])],
            providers: [RouterTestingModule]
        });
 
    });
    it('Auth-Guard service should be created', () => {
      const service: RouterTestingModule = TestBed.get(RouterTestingModule);
      expect(service).toBeTruthy();
    });
 
});