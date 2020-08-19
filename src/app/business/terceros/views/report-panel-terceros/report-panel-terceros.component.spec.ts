import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPanelTercerosComponent } from './report-panel-terceros.component';

describe('ReportPanelTercerosComponent', () => {
  let component: ReportPanelTercerosComponent;
  let fixture: ComponentFixture<ReportPanelTercerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPanelTercerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPanelTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
