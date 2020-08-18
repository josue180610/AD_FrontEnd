import { TestBed, async } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing'; 

import { HttpClientModule } from '@angular/common/http';
  
describe('Auth service', () => {
 
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule,RouterTestingModule.withRoutes([])],
            providers: [AuthService]
        });
 
    });
    it('should be created', () => {
      const service: AuthService = TestBed.get(AuthService);
      expect(service).toBeTruthy();
    });
 
});