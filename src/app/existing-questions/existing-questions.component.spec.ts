import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingQuestionsComponent } from './existing-questions.component';

describe('ExistingQuestionsComponent', () => {
  let component: ExistingQuestionsComponent;
  let fixture: ComponentFixture<ExistingQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
