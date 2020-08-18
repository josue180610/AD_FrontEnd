import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusTeamComponent } from './coronavirus-team.component';

describe('CoronavirusTeamComponent', () => {
  let component: CoronavirusTeamComponent;
  let fixture: ComponentFixture<CoronavirusTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
