import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusCheckingComponent } from './coronavirus-checking.component';

describe('CoronavirusCheckingComponent', () => {
  let component: CoronavirusCheckingComponent;
  let fixture: ComponentFixture<CoronavirusCheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusCheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
