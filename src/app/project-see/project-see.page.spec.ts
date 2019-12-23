import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSeePage } from './project-see.page';

describe('ProjectSeePage', () => {
  let component: ProjectSeePage;
  let fixture: ComponentFixture<ProjectSeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
