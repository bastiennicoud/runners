import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Subscription} from "rxjs/Rx";
import {LoginPage} from "../login/login";
import {AuthService} from "../../services/auth.service";
import {VehiclesPage} from "../vehicles/vehicles";
import {RunsPage} from "../runs/runs";
import {InternetStatusProvider} from "../../providers/internet-status/internet-status";
import {SettingsPage} from "../settings/settings";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public currentPage:number;
  public currentComponent:any;
  public pageName:any = false;
  pages = [
    {id : 0, menu:"Runs", title:"Board", icon: "ios-clipboard-outline", component: RunsPage},
    {id : 1, menu:"Vehicles", title:"Vehicles", icon:"ios-car", component: VehiclesPage},
    {id : 2, menu:"Logout", title:"Logout", icon:"log-out", class: "button--bottom"},
    {id : 3, menu:"Settings", title:"Settings", icon:"settings", component: SettingsPage, class: "button--bottom"}
  ];

  loggedSubscriber: Subscription;

  constructor(private navCtrl: NavController, private authService: AuthService, private InternetStatus: InternetStatusProvider, public menuCtrl : MenuController, public navParams : NavParams) {
    this.openPage(0);
  }

  openPage(index : number) {

    // check if logout button
    if (index == 2) {
      this.authService.logout()
      return
    }

    this.currentPage = index;
    this.currentComponent = this.pages[index]
  }

  ionViewWillEnter() {
    this.InternetStatus.checkConnection()
    this.pageName = this.navParams.get("title")

  }
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
    this.InternetStatus.stopCheckingConnection()
  }

}
