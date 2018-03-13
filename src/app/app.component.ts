import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { LoginPage } from '../pages/login/login'
import { CacheService } from 'ionic-cache'
import { RefresherProvider } from '../providers/refresher/refresher'
import {SplashPage} from "../pages/splash/splash";
import {HomePage} from "../pages/home/home";
import {AuthService} from "../services/auth.service";

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage : any = LoginPage

  constructor(
    platform: Platform,
    cache: CacheService,
    private statusBar: StatusBar,
    private refresher: RefresherProvider,
    private authService : AuthService
  ) {
    Promise.all([
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.hide()
        this.authService.isAuthenticated ? this.rootPage = HomePage : this.rootPage = LoginPage
      }),
      cache.ready().then(() => {
        // Set TTL to 12h
        cache.setDefaultTTL(60 * 60 * 12)
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false)
      }),
    ])

  }
}
