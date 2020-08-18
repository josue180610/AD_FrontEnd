import { TestBed, async } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginFormModule } from '../../commons/components/login-form/login-form.module';
import { TDPLocalStorageService } from '@tdp/ng-commons';


describe('LoginPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginPageComponent 
      ],
      imports:[
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        LoginFormModule,

      ],
      providers:[
        TDPLocalStorageService
      ]
    }).compileComponents();
  }));
  it('should create Login Page', async(() => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});