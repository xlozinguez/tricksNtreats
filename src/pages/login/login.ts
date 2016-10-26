import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserDetails } from '@ionic/cloud-angular';

import { SignupPage } from '../signup/signup';
import { MapPage } from '../map/map';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  login: UserDetails = {}
  submitted = false

  constructor(
    public nav: NavController,
    public userData: UserData
  ) {}

  onLogin(form) {
    if (form.valid) {
      this.submitted = true;
      this.userData.login(this.login).then(function(){
        this.nav.setRoot(MapPage);
      });
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }

}
