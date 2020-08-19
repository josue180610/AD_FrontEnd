import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelTercerosComponent } from './admin-panel-terceros.component';

describe('AdminPanelTercerosComponent', () => {
  let component: AdminPanelTercerosComponent;
  let fixture: ComponentFixture<AdminPanelTercerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelTercerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
