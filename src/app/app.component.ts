import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Flashlight } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MapPage } from '../pages/map/map';
import { AccountPage } from '../pages/account/account';
import { LocationListPage } from '../pages/location-list/location-list';

import { LocationData } from '../providers/location-data';
import { UserData } from '../providers/user-data';

export interface PageObj {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class TricksAndTreatsApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Map', component: MapPage, icon: 'map' },
    { title: 'Locations', component: LocationListPage, icon: 'pin' }
  ];
  loggedInPages: PageObj[] = [
    { title: 'Profile', component: AccountPage, icon: 'person' },
    { title: 'Logout', component: LoginPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];

  rootPage = MapPage;

  constructor(
    public events: Events,
    public userData: UserData,
    public locData: LocationData,
    public menu: MenuController,
    platform: Platform
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // decide which menu items should be hidden by current login status
    this.enableMenu(this.userData.isLoggedIn());

    this.listenToLoginEvents();
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
      this.locData.wipeFavorites();
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  toggleFlashLight() {
    Flashlight.toggle();
  }
}
