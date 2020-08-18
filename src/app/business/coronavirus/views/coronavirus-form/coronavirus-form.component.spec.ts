import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusFormComponent } from './coronavirus-form.component';

describe('CoronavirusFormComponent', () => {
  let component: CoronavirusFormComponent;
  let fixture: ComponentFixture<CoronavirusFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
