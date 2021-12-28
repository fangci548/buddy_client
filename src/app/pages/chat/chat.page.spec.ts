import { TestBed } from '@angular/core/testing';

import { ChatPage } from './chat.page';

describe('UserService', () => {
  let service: ChatPage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
