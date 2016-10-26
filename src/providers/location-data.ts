import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Storage } from '@ionic/storage';

import { UserData } from './user-data';

@Injectable()
export class LocationData {
  _favorites = [];

  constructor(
    public http: Http,
    public user: UserData,
    public storage: Storage
  ) {}

  load() {
    return new Promise(resolve => {
      this.http.get('http://localhost:2403/locations').subscribe(res => {
        this.setLocations(res.json());
        resolve(this.getLocations());
      });
    });
  }

  setLocations(locations) {
    this.storage.set('locations', locations);
  }

  getLocations() {
    return this.storage.get('locations').then((value) => {
      return value;
    });
  }

  myLocation() {
    return this.getLocations().then((locations) => {
      return locations.filter(function(l) { l.userId === this.user.id });
    });
  }

  // TODO add favorites locations within user model
  isFavorite(locationId) {
    return (this._favorites.indexOf(locationId) > -1);
  }

  toggleFavorite(locationId) {
    let index = this._favorites.indexOf(locationId);
    if (index > -1) {
      this._favorites.splice(index, 1);
    } else {
      this._favorites.push(locationId);
    }
  }

  wipeFavorites() {
    this._favorites.length = 0;
  }

}
