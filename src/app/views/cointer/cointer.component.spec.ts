import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CointerComponent } from './cointer.component';

describe('CointerComponent', () => {
  let component: CointerComponent;
  let fixture: ComponentFixture<CointerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CointerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CointerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
