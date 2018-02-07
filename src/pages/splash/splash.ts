import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { HomePage } from '../home/home'
import { RefresherProvider } from '../../providers/refresher/refresher'

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  private alreadyLaunched = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private refresher: RefresherProvider
  ) {}

  ionViewWillLoad() {
    this.refresher
      .hisFirstTime()
      .then(() => this.navCtrl.setRoot(HomePage))
      .catch(() =>
        this.refresher.refreshData().subscribe(null, null, () => {
          this.refresher.setFirstUsage()
          this.navCtrl.setRoot(HomePage)
        })
      )
  }
}
