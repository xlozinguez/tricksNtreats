import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth, User, IDetailedError  } from '@ionic/cloud-angular';

@Injectable()
export class UserData {

  constructor(
    public auth: Auth,
    public user: User,
    public events: Events,
    public storage: Storage
  ) {}

  login(user) {
    return this.auth.login('basic', user).then(() => {
      this.setUser(user);
      this.events.publish('user:login');
    });
  }

  signup(user) {
    return this.auth.signup(user).then(() => {
      this.setUser(user);
      this.events.publish('user:signup');
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        if (e === 'conflict_email') {
          alert('Email already exists.');
        } else {
          alert(e);
        }
      }
    });
  }

  logout() {
    this.auth.logout();
    this.storage.remove('user');
    this.events.publish('user:logout');
  }

  setUser(user) {
    this.storage.set('user', user);
  }

  getUser() {
    return this.storage.get('user').then((value) => {
      return value;
    });
  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }
}
