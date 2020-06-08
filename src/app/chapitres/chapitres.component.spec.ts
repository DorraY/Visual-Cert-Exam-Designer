import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapitresComponent } from './chapitres.component';

describe('ChapitresComponent', () => {
  let component: ChapitresComponent;
  let fixture: ComponentFixture<ChapitresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapitresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapitresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
