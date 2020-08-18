import { TestBed, async } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { RouterTestingModule } from '@angular/router/testing'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; 
import { TDPDirectivesModule } from '@tdp/ng-commons';

describe('LoginFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginFormComponent 
      ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) ,
        ReactiveFormsModule,
        TDPDirectivesModule
      ],
      providers:[
        
      ]
    }).compileComponents();
  }));
  it('should create  Login Form', async(() => {
    const fixture = TestBed.createComponent(LoginFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});