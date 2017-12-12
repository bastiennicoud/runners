import { Injectable } from '@angular/core'
import { ToastController } from 'ionic-angular'
import { CacheService } from 'ionic-cache'
import { Subscription } from 'rxjs'

@Injectable()
/**
 * Manages the logic for checking the internet connection
 * @param  {ToastController} privatetoast
 * @param  {CacheService}    privatecache
 *
 * @export
 * @class InternetStatusProvider
 */
export class InternetStatusProvider {
  private connectionStatus: boolean = true
  private networkStatus: Subscription

  constructor(private toast: ToastController, private cache: CacheService) {}

  public checkConnection(): void {
    this.networkStatus = this.cache.getNetworkStatusChanges().subscribe(
      connected => {
        this.connectionStatus = connected

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
      },
      err => {},
      () => {}
    )
  }

  public getConnectionStatus(): boolean {
    return this.connectionStatus
  }

  public stopCheckingConnection(): void {
    this.networkStatus.unsubscribe()
  }
}
