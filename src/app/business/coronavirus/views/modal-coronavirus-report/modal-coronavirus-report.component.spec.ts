import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoronavirusReportComponent } from './modal-coronavirus-report.component';

describe('ModalCoronavirusReportComponent', () => {
  let component: ModalCoronavirusReportComponent;
  let fixture: ComponentFixture<ModalCoronavirusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCoronavirusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCoronavirusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
