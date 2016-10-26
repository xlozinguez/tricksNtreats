import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserDetails} from '@ionic/cloud-angular';

import { MapPage } from '../map/map';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {
  signup: UserDetails = {}
  submitted = false

  constructor(
    public nav: NavController,
    public userData: UserData
  ) {}

  onSignup(form) {
    if (form.valid) {
      this.submitted = true;
      this.userData.login(this.signup).then(function(){
        this.nav.setRoot(MapPage);
      });
    }
  }

}
