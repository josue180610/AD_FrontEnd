import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoronavirusRelationshipComponent } from './modal-coronavirus-relationship.component';

describe('ModalCoronavirusRelationshipComponent', () => {
  let component: ModalCoronavirusRelationshipComponent;
  let fixture: ComponentFixture<ModalCoronavirusRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCoronavirusRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCoronavirusRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
