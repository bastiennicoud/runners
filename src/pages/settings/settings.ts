import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { CacheService } from 'ionic-cache'
import { AuthService } from '../../services/auth.service'
import { getApi, setApi, APP_VERSION } from '../../runners.getter'
import { ToastController } from 'ionic-angular'
import {CacheProvider} from "../../providers/cache/cache";

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
  protected appVersion = APP_VERSION
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cacheService: CacheProvider,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  clearCache() {
    this.cacheService.clearAll().catch(()=>console.log("cache disabled")) //TODO define if clearAll, or only expired
    this.cacheService
      .getItem(getApi() + '/runs?finished=true')
      .then(d => console.log(d))
      .catch(e => console.log(e))
  }
  setApi() {
    setApi(this.apiValue)
    this.toastCtrl
      .create({
        message: "L'adresse api a été changée",
        duration: 3000,
        position: 'bottom',
      })
      .present()
    console.log(getApi())
  }
  toggleCache(){
    this.cacheService.enableCache(!this.cacheService.isCacheEnabled);
  }
}
