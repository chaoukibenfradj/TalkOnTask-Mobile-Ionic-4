import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddDevComponent } from './task-add-dev.component';

describe('TaskAddDevComponent', () => {
  let component: TaskAddDevComponent;
  let fixture: ComponentFixture<TaskAddDevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAddDevComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
