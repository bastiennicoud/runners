import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { CacheService } from 'ionic-cache'
import { AuthService } from '../../services/auth.service'
import { getApi, setApi } from '../../runners.getter'
import { ToastController } from 'ionic-angular'

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
  protected apiValue = getApi()
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cacheService: CacheService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  logout() {
    this.authService.logout()
  }
  clearCache() {
    this.cacheService.clearAll() //TODO define if clearAll, or only expired
    this.cacheService
      .getItem(getApi() + '/runs?finished=true')
      .then(d => console.log(d))
      .catch(e => console.log(e))
  }
  setApi() {
    setApi(this.apiValue)
    this.toastCtrl.create({
      message: "L'adresse api a été changée",
      duration: 3000,
      position: 'bottom',
    }).present()
    console.log(getApi());

  }
}
