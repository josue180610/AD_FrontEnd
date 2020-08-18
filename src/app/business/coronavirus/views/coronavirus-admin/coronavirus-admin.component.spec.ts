import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusAdminComponent } from './coronavirus-admin.component';

describe('CoronavirusAdminComponent', () => {
  let component: CoronavirusAdminComponent;
  let fixture: ComponentFixture<CoronavirusAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
