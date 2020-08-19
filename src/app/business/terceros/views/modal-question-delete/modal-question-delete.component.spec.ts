import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuestionDeleteComponent } from './modal-question-delete.component';

describe('ModalQuestionDeleteComponent', () => {
  let component: ModalQuestionDeleteComponent;
  let fixture: ComponentFixture<ModalQuestionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQuestionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuestionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
