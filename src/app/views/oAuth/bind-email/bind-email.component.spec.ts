import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindEmailComponent } from './bind-email.component';

describe('BindEmailComponent', () => {
  let component: BindEmailComponent;
  let fixture: ComponentFixture<BindEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
