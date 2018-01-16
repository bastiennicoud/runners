import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "ionic-cache";
import {AuthService} from "../../services/auth.service";
import {api} from '../../runners.config'

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private cacheService: CacheService, private authService : AuthService) {
  }

  logout(){
    this.authService.logout();
  }
  clearCache(){
    this.cacheService.clearAll(); //TODO define if clearAll, or only expired
    this.cacheService.getItem(api+"/runs?finished=true").then(d => console.log(d)).catch(e=>console.log(e))
  }

}
