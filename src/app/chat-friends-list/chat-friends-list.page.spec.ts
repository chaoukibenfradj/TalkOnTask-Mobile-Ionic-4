import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFriendsListPage } from './chat-friends-list.page';

describe('ChatFriendsListPage', () => {
  let component: ChatFriendsListPage;
  let fixture: ComponentFixture<ChatFriendsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFriendsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFriendsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
