import { TestBed, async } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing'; 
describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent 
      ],
      imports:[
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();
  }));
  it('should create Heaer', async(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});