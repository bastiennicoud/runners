import { Component } from '@angular/core'
import { NavController, Platform, ToastController } from 'ionic-angular'
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { SplashScreen } from '@ionic-native/splash-screen'

import { AuthService } from '../../services/auth.service'
import { AuthStorage } from '../../storages/auth.storage'
import { TabsPage } from '../tabs/tabs'
import { HttpClient } from '@angular/common/http'
import { HomePage } from '../home/home'
import { SplashPage } from '../splash/splash'
import { RefresherProvider } from '../../providers/refresher/refresher'

/**
 * This class displays the login page
 *
 * @export
 * @class LoginPage
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private authStorage: AuthStorage,
    private splashScreen: SplashScreen,
    private barcodeScanner: BarcodeScanner,
    private http: HttpClient,
    private refresher: RefresherProvider
  ) {
    this.platform
      .ready()

      .then(() => this.splashScreen.hide())
  }

  /**
   * This function launch the scan to oprerate with a qrcode as soon as the device is ready
   *
   *
   * @memberOf LoginPage
   */
  scan(): void {
    this.platform.ready().then(() => {
      this.barcodeScanner
        .scan({
          preferFrontCamera: false,
          showFlipCameraButton: true,
          showTorchButton: true,
          prompt: 'Scannez le QRCode derrière votre carte',
          formats: 'QR_CODE',
        })
        .then(result => !result.cancelled && this.login(result.text))
    })
  }

  /**
   * This function allow to enter the code to connect to the app manually (you have to swipe to the left to discover this option)
   *
   * @param {any} e
   * @returns {void}
   *
   * @memberOf LoginPage
   */
  manually(e): void {
    e.preventDefault()
    const key = e.target.key.value

    if (!key) {
      this.toastCtrl
        .create({
          message: 'Le champ est vide',
          duration: 1500,
          position: 'top',
          showCloseButton: true,
        })
        .present()
      return
    }

    this.login(key)
  }

  /**
   * Log in the user and display a toast in case of error or successful connection
   *
   * @param {string} key
   *
   * @memberOf LoginPage
   */
  login(key: string): void {
    this.authService.login(key).subscribe(
      user => {
        if (user == null) {
          return
        }
        this.toastCtrl
          .create({
            message: `Bonjour ${user.fullname}, vous êtes connecté`,
            duration: 3000,
            position: 'top',
            showCloseButton: true,
          })
          .present()
        this.navCtrl.setRoot(SplashPage)
      },
      err => {
        if (err.status == 401)
          this.toastCtrl
            .create({
              message: 'La clé est erronée',
              duration: 10000,
              position: 'top',
              showCloseButton: true,
            })
            .present()
        else
          this.toastCtrl
            .create({
              message: 'Problème de connexion, veuillez ressayer plus tard',
              duration: 10000,
              position: 'top',
              showCloseButton: true,
            })
            .present()
      }
    )
  }
}
