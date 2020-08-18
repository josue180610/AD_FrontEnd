import { TestBed, async } from '@angular/core/testing';
import { LayoutComponent } from './layout.component'; 
import { RouterTestingModule } from '@angular/router/testing'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderModule } from '../commons/components/header/header.module'; 
import { MenuModule } from '../commons/components/menu/menu.module';
import { TDPLocalStorageService } from '@tdp/ng-commons';

  describe('LayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent 
      ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        HeaderModule,
        MenuModule
      ],
      providers:[
        TDPLocalStorageService
      ]
    }).compileComponents();
  }));
  it('should create Layout', async(() => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});