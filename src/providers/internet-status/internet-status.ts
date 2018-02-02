import { Injectable } from '@angular/core'
import { ToastController } from 'ionic-angular'
import { CacheService } from 'ionic-cache'
import { Subscription } from 'rxjs'
import {Observable} from "rxjs/Observable";

@Injectable()
/**
 * Manages the logic for checking the internet connection
 * @param  {ToastController} privatetoast
 * @param  {CacheService}    privatecache
 *
 * @export
 * @class InternetStatusProvider
 */
export class InternetStatusProvider{

  private _connectionStatus: boolean = false
  private networkStatusChanges: Observable<boolean>;

  constructor(private toast: ToastController) {
    this.watchNetworkInit();
  }


  get networkStatus(){
    return this._connectionStatus
  }

  set networkStatus(connected){
    this._connectionStatus = connected;
    if (!connected) {
      this.toast
        .create({
          message: `Connection lost`,
          duration: 3000,
        })
        .present()
    } else {
      this.toast
        .create({
          message: `Connected`,
          duration: 3000,
        })
        .present()
    }
  }


  private watchNetworkInit() {
    this.networkStatus = navigator.onLine;
    const connect = Observable.fromEvent(window, 'online').map(() => true),
      disconnect = Observable.fromEvent(window, 'offline').map(() => false);

    this.networkStatusChanges = Observable.merge(connect, disconnect).share();
    this.networkStatusChanges.subscribe(status => {
      this.networkStatus = status;
    });
  }

  public getConnectionStatus(): boolean {
    return this.networkStatus
  }

}
