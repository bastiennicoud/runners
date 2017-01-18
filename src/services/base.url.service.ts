import { Platform } from 'ionic-angular';

export abstract class BaseUrlService {

  public BASE_URL: string = '';

  constructor(public platform: Platform) {
    if (platform.is('core')) {
      this.BASE_URL = '/api'
    } else {
      this.BASE_URL = 'https://markal.servehttp.com/runners/api'
    }
  }

}
