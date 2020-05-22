import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingExamsComponent } from './existing-exams.component';

describe('ExistingExamsComponent', () => {
  let component: ExistingExamsComponent;
  let fixture: ComponentFixture<ExistingExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
