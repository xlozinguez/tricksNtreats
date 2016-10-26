import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LocationData } from '../../providers/location-data';

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html'
})
export class LocationListPage {
  locations: any;

  constructor(public navCtrl: NavController, public locData: LocationData) {
    this.locData.load().then(locations => {
      this.locations = locations;
    });
  }

  toggleFavorite(location) {
    this.locData.toggleFavorite(location);
  }

  openLocation(location) {
    console.log(location);
  }

}
