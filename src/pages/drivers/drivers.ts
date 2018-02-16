import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user'
import { DriverPage } from '../driver/driver'
import { AuthStorage } from '../../storages/auth.storage'

/**
 * Generated class for the DriversPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drivers',
  templateUrl: 'drivers.html',
})
export class DriversPage {
  drivers: User[] = []
  user: User
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private authStorage: AuthStorage
  ) {}

  ionViewDidLoad() {
    this.user = this.authStorage.user
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadDrivers().subscribe(
        () => loader.dismiss().catch(err => console.log(err)),
        err =>
          err.status != 401 && loader.dismiss().catch(err => console.log(err))
      )
    })
  }

  getDrivers() {
    return this.drivers
  }

  loadDrivers() {
    return this.userService.all().do(drivers => (this.drivers = drivers))
  }

  /**
   * Function to refresh when pulled
   *
   * @param {any} refresher
   *
   * @memberOf DriversPage
   */
  refreshDrivers(refresher) {
    this.loadDrivers().subscribe(
      null,
      err =>
        err.status != 401 && refresher.cancel()
          ? refresher.cancel().catch(err => console.log(err))
          : true,
      () => refresher.complete()
    )
  }

  /**
   * Show the detail of a driver
   *
   * @param {Driver} { id }
   *
   * @memberOf DriversPage
   */
  showDriver({ id }: User): void {
    this.navCtrl.push(DriverPage, { id })
  }
}
