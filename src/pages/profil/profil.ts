import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

import { AuthStorage } from '../../storages/auth.storage'
import { CallNumber } from 'ionic-native'

import { UserService, User } from '../../services/user.service'
import { InternetStatusProvider } from '../../providers/internet-status/internet-status'

import debug from 'debug'

/**
 * This class displays the profil of a user
 *
 * @export
 * @class ProfilPage
 */
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  user: User

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private authStorage: AuthStorage,
    private InternetStatus: InternetStatusProvider
  ) {}

  ionViewWillEnter() {

    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present()
    this.loadUser().subscribe(
      user => debug('profil')(user),
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    )
  }

  ionViewWillLeave() {
  }

  /**
   * Load the datas of the user
   *
   * @returns
   *
   * @memberOf ProfilPage
   */
  loadUser() {
    return this.userService
      .get(this.navParams.get('id'))
      .do(user => (this.user = user))
  }

  /**
   * Call the user with a notive functionality
   *
   *
   * @memberOf ProfilPage
   */
  callUser() {
    CallNumber.callNumber(this.user.phoneNumber, false)
      .then(() => debug('profil')('Launched dialer!'))
      .catch(() => console.error('Error launching dialer / not available'))
  }
}
