import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListMessagesPage } from './chat-list-messages.page';

describe('ChatListMessagesPage', () => {
  let component: ChatListMessagesPage;
  let fixture: ComponentFixture<ChatListMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatListMessagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
