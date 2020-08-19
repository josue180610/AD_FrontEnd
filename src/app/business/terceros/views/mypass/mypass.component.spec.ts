import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypassComponent } from './mypass.component';

describe('MypassComponent', () => {
  let component: MypassComponent;
  let fixture: ComponentFixture<MypassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
