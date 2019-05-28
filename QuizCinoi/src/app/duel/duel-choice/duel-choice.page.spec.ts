import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelChoicePage } from './duel-choice.page';

describe('DuelChoicePage', () => {
  let component: DuelChoicePage;
  let fixture: ComponentFixture<DuelChoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuelChoicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelChoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
