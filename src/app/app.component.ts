import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {

    // TODO: Leave Splashscreen management here, check if we should put it on TabsPage

    Splashscreen.show();

    platform.ready().then(() => {

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
