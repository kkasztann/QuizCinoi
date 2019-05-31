import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelPage } from './duel.page';

describe('DuelPage', () => {
  let component: DuelPage;
  let fixture: ComponentFixture<DuelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
