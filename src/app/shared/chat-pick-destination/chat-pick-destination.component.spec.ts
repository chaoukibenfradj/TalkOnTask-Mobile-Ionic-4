import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPickDestinationComponent } from './chat-pick-destination.component';

describe('ChatPickDestinationComponent', () => {
  let component: ChatPickDestinationComponent;
  let fixture: ComponentFixture<ChatPickDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPickDestinationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPickDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
