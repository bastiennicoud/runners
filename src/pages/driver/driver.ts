import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user'
import { AuthStorage } from '../../storages/auth.storage'
import { InternetStatusProvider } from '../../providers/internet-status/internet-status'
/**
 * Generated class for the DriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})
export class DriverPage {
  driver: User
  user: User

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private authStorage: AuthStorage,
    private InternetStatus: InternetStatusProvider
  ) {}

  ionViewDidLoad() {
    this.user = this.authStorage.user

    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadDriver().subscribe(
        () => loader.dismiss().catch(err => console.log(err)),
        err =>
          err.status != 401 && loader.dismiss().catch(err => console.log(err)) //TODO temporary dismiss
      )
    })
  }

  loadDriver() {
    return this.userService
      .get(this.navParams.get('id'))
      .do(driver => (this.driver = driver))
  }

  getDriver() {
    return this.driver
  }
}
