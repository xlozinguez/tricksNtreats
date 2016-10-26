import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { TricksAndTreatsApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MapPage } from '../pages/map/map';
import { AccountPage } from '../pages/account/account';
import { LocationListPage } from '../pages/location-list/location-list';

import { LocationData } from '../providers/location-data';
import { UserData } from '../providers/user-data';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '2478edc0'
  }
};

@NgModule({
  declarations: [
    TricksAndTreatsApp,
    LoginPage,
    SignupPage,
    MapPage,
    AccountPage,
    LocationListPage
  ],
  imports: [
    IonicModule.forRoot(TricksAndTreatsApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TricksAndTreatsApp,
    LoginPage,
    SignupPage,
    MapPage,
    AccountPage,
    LocationListPage
  ],
  providers: [LocationData, UserData, Storage]
})
export class AppModule {}
