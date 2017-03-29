import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { RunsPage } from '../runs/runs';
import { VehiclesPage } from '../vehicles/vehicles';

/**
 * This class display the tabs menu (always displayed when logged in)
 *
 * @export
 * @class TabsPage
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1: any = RunsPage;
  tab2: any = VehiclesPage;

  loggedSubscriber: Subscription;

  constructor(private navCtrl: NavController, private authService: AuthService) {}

/**
 * When the auth service tells us the user isn't authenticate, we redirect the user to the login page
 *
 * @memberOf TabsPage
 */
  ionViewWillLoad() {
    this.loggedSubscriber = this.authService.loggedOut.subscribe(() => this.navCtrl.setRoot(LoginPage));
  }

/**
 * As soon as we leave the tabs page, we unsubscribe to the auth service
 *
 *
 * @memberOf TabsPage
 */
  ionViewWillLeave() {
    this.loggedSubscriber && this.loggedSubscriber.unsubscribe();
  }

}
