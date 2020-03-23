import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsInterfaceComponent } from './questions-interface.component';

describe('QuestionsInterfaceComponent', () => {
  let component: QuestionsInterfaceComponent;
  let fixture: ComponentFixture<QuestionsInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
