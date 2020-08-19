import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdpPanelTercerosComponent } from './tdp-panel-terceros.component';

describe('TdpPanelTercerosComponent', () => {
  let component: TdpPanelTercerosComponent;
  let fixture: ComponentFixture<TdpPanelTercerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdpPanelTercerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdpPanelTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
