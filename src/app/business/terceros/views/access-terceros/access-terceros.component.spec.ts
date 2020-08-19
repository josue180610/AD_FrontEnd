import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTercerosComponent } from './access-terceros.component';

describe('AccessTercerosComponent', () => {
  let component: AccessTercerosComponent;
  let fixture: ComponentFixture<AccessTercerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessTercerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
