import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private scannerConfig: any = {
    preferFrontCamera: false,
    showFlipCameraButton: true,
    showTorchButton: true,
    'prompt': 'Scannez le QRCode derrière votre carte',
    formats: 'QR_CODE',
  };

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private toastCtrl: ToastController,
    private auth: AuthService
  ) {}


  scan() {
    this.platform.ready().then(_ => {

      if(this.platform.is('core')) {
        this.login('first_user');
        return;
      }

      BarcodeScanner.scan(this.scannerConfig).then(result => {
        if(result.cancelled) return;
        this.login(result.text);
      });
    });
  }

  login (key) {
    this.auth.login(key).subscribe(user =>  {
      this.toastCtrl.create({
        message: `Bonjour ${user.firstname} ${user.lastname}, vous êtes connecté`,
        duration: 3000,
        position: 'top',
      }).present();
      this.navCtrl.popToRoot();
    }, error => {
      this.toastCtrl.create({
        message: 'Problème de connexion, veuillez ressayer plus tard',
        position: 'top',
        showCloseButton: true,
      }).present();
      console.error(error);
    });
  }

}
