import { Platform } from 'ionic-angular';

export abstract class BaseUrlService {

  public BASE_URL: string = '';

  constructor(public platform: Platform) {
    if (platform.is('cordova')) {
      this.BASE_URL = 'https://markal.servehttp.com/runners/api'
    } else {
      this.BASE_URL = '/api';
    }
  }
}