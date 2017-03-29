import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AuthStorage } from '../../storages/auth.storage';
import { CallNumber } from 'ionic-native';

import { UserService, User } from '../../services/user.service';

/**
 * This class displays the profil of a user
 *
 * @export
 * @class ProfilPage
 */
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})

export class ProfilPage {

  user: User;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private userService: UserService, private authStorage: AuthStorage) {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' });
    loader.present();
    this.loadUser().subscribe(
      user => console.log(user),
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    );
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
      .do(user => this.user = user);
  }

/**
 * Call the user with a notive functionality
 *
 *
 * @memberOf ProfilPage
 */
  callUser(){
    CallNumber.callNumber(this.user.phoneNumber, false)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer / not available'));
  }
}
