import { Component } from '@angular/core'
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular'
import { CacheService } from 'ionic-cache'
import { AuthService } from '../../services/auth.service'
import { getApi, setApi, APP_VERSION } from '../../runners.getter'
import { ToastController } from 'ionic-angular'
import {CacheProvider} from "../../providers/cache/cache";
import {RefresherProvider} from "../../providers/refresher/refresher";

import debug from 'debug'

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
    private toastCtrl: ToastController,
    private refresherProvider : RefresherProvider,
    private loadingCtrl : LoadingController
  ) {}

  clearCache() {
    this.cacheService.clearAll().catch(()=>debug('settings')("cache disabled")) //TODO define if clearAll, or only expired
    this.cacheService
      .getItem(getApi() + '/runs?finished=true')
      .then(d => debug('settings')('runs obtained : %O',d))
      .catch(e => console.error(e))
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
    debug('settings')('api changed to : %s',getApi())
  }
  toggleCache(){
    this.cacheService.enableCache(!this.cacheService.isCacheEnabled);
  }
  forceDataRefresh() {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(()=> this.refresherProvider.refreshData().subscribe(null,null,()=>loader.dismissAll()))

  }

}
