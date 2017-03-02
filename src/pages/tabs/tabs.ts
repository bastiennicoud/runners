import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { RunsPage } from '../runs/runs';
import { VehiclesPage } from '../vehicles/vehicles';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1: any = RunsPage;
  tab2: any = VehiclesPage;
  tab3: any = null;
  tab4: any = null;
  tab5: any = null;

  loggedSubscriber: Subscription;

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  ionViewWillLoad() {
    this.loggedSubscriber = this.authService.loggedOut.subscribe(() => this.navCtrl.setRoot(LoginPage));
  }

  ionViewWillLeave() {
    this.loggedSubscriber && this.loggedSubscriber.unsubscribe();
  }

}
