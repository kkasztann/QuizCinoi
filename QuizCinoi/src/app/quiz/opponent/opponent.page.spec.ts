import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentPage } from './opponent.page';

describe('OpponentPage', () => {
  let component: OpponentPage;
  let fixture: ComponentFixture<OpponentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpponentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
