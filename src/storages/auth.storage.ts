import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable()
export class AuthStorage {

  private keyForKey = 'authToken';
  private keyForUser = 'user';

  get key(): string | null {
    return localStorage.getItem(this.keyForKey);
  }

  set key(key: string | null) {
    localStorage.setItem(this.keyForKey, key);
  }

  get user(): User | null {
    return User.build(JSON.parse(localStorage.getItem(this.keyForUser)));
  }

  set user(user: User | null) {
    localStorage.setItem(this.keyForUser, JSON.stringify(user));
  }

}
