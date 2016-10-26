import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserDetails } from '@ionic/cloud-angular';

import { LoginPage } from '../login/login';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  userInfo: UserDetails = {};

  constructor(
    public nav: NavController,
    public userData: UserData
  ) {}

  ngAfterViewInit() {
    this.userData.getUser().then((data) => {
      this.userInfo = data;
    });
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }
}
