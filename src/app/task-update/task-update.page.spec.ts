import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUpdatePage } from './task-update.page';

describe('TaskUpdatePage', () => {
  let component: TaskUpdatePage;
  let fixture: ComponentFixture<TaskUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
