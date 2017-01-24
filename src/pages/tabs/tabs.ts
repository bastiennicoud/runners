import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = HomePage;
  tab3Root: any = HomePage;
  tab4Root: any = HomePage;
  tab5Root: any = HomePage;

  constructor(platform: Platform, auth: AuthService, navCtrl: NavController) {

    // When user is logged out change Page
    auth.loggedOut.subscribe(_ => navCtrl.push(LoginPage));

    // If User is not authenticated, redirect him on login Page
    if (!auth.isAuthenticated()) auth.redirectToLogin();

  }
}
