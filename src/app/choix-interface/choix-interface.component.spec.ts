import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixInterfaceComponent } from './choix-interface.component';

describe('ChoixInterfaceComponent', () => {
  let component: ChoixInterfaceComponent;
  let fixture: ComponentFixture<ChoixInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
