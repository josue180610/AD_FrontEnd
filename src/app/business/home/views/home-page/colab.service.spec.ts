import { TestBed, async } from '@angular/core/testing';
import { ColabService } from './colab.service';
import { RouterTestingModule } from '@angular/router/testing'; 

import { HttpClientModule } from '@angular/common/http';
  
describe('Auth service', () => {
 
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule,RouterTestingModule.withRoutes([])],
            providers: [ColabService]
        });
 
    });
    it('should be created', () => {
      const service: ColabService = TestBed.get(ColabService);
      expect(service).toBeTruthy();
    });
 
});