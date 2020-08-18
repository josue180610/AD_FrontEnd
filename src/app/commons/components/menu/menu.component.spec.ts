import { TestBed, async } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing'; 
import { TDPLocalStorageService } from '@tdp/ng-commons';
describe('MenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent 
      ],
      imports:[
        RouterTestingModule.withRoutes([]) 
      ],
      providers:[
        TDPLocalStorageService
      ]
    }).compileComponents();
  }));
  it('should create Menu', async(() => {
    const fixture = TestBed.createComponent(MenuComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});