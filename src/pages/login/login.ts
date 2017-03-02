import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { BarcodeScanner, Splashscreen } from 'ionic-native';

import { AuthService } from '../../services/auth.service';
import { AuthStorage } from '../../storages/auth.storage';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private platform: Platform, private navCtrl: NavController, private toastCtrl: ToastController, private authService: AuthService, private authStorage: AuthStorage) {
    this.platform.ready()
      .then(() => this.authService.isAuthenticated ? this.navCtrl.setRoot(TabsPage) : null)
      .then(() => Splashscreen.hide());
  }

  scan(): void {
    this.platform.ready().then(() => {

      // TODO: Remove this on production
      if (!this.platform.is('cordova')) {
        this.login('first_user');
        return;
      }

      BarcodeScanner
        .scan({
          preferFrontCamera: false,
          showFlipCameraButton: true,
          showTorchButton: true,
          'prompt': 'Scannez le QRCode derrière votre carte',
          formats: 'QR_CODE',
        })
        .then(result => !result.cancelled && this.login(result.text));
    });
  }

  manually(e): void {
    e.preventDefault();
    const key = e.target.key.value;

    if (!key) {
      this.toastCtrl.create({
        message: 'Le champ est vide',
        duration: 1500,
        position: 'top',
        showCloseButton: true,
      }).present();
      return;
    }

    this.login(key);
  }

  login(key: string): void {
    this.authService.login(key).subscribe(
      user => {
        this.toastCtrl.create({
          message: `Bonjour ${user.fullname}, vous êtes connecté`,
          duration: 3000,
          position: 'top',
          showCloseButton: true,
        }).present();
        this.navCtrl.setRoot(TabsPage);
      },
      err => {
        if (err.status == 401) this.toastCtrl.create({
            message: 'La clé est erronée',
            duration: 10000,
            position: 'top',
            showCloseButton: true,
          }).present();
        else this.toastCtrl.create({
            message: 'Problème de connexion, veuillez ressayer plus tard',
            duration: 10000,
            position: 'top',
            showCloseButton: true,
          }).present();
      }
    );
  }

}
