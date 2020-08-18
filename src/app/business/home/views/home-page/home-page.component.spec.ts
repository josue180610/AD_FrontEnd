import { TestBed, async } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component'; 
import { RouterTestingModule } from '@angular/router/testing'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomePageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePageComponent 
      ],
      imports:[
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));
  it('should create Home Page', async(() => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});