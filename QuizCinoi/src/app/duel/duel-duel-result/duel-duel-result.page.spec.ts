import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelDuelResultPage } from './duel-duel-result.page';

describe('DuelDuelResultPage', () => {
  let component: DuelDuelResultPage;
  let fixture: ComponentFixture<DuelDuelResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuelDuelResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelDuelResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
