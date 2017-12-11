import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import {CacheService} from "ionic-cache";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, cache: CacheService, private statusBar: StatusBar) {
    platform.ready().then(() => {
      // Set TTL to 12h
      cache.setDefaultTTL(60 * 60 * 12);

      // Keep our cached results when device is offline!
      cache.setOfflineInvalidate(false);

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
    });
  }
}
