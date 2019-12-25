import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRequestListPage } from './task-request-list.page';

describe('TaskRequestListPage', () => {
  let component: TaskRequestListPage;
  let fixture: ComponentFixture<TaskRequestListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskRequestListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRequestListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
